import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaskedView from '@react-native-masked-view/masked-view';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { initPaymentSheet, presentPaymentSheet, StripeProvider } from '@stripe/stripe-react-native';
import {
  getPaymentIntent,
  useInvoices,
  usePaymentIntentCapture,
  usePaymentNotices,
  usePaymentNoticeSubmit,
  usePaymentIntentCancel
} from '@services';
import { formatDate } from '@utils';
import { Invoice, PaymentNotice } from '@interfaces';
import { Header, Input, InvoiceCard, ZeroState } from '@components';
import receipt from '@assets/images/cc-payment.svg';
import { g } from '@styles';

const s = StyleSheet.create({
  androidButtonContainer: {
    top: g.size(26),
    height: g.size(44),
  },
  androidDollarSign: {
    top: g.size(40),
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    top: g.size(18),
    height: g.size(36),
  },
  container: {
    flex: 1,
    backgroundColor: g.neutral100,
  },
  disabled: {
    opacity: 0.7,
  },
  dollarSign: {
    position: 'absolute',
    top: g.size(26),
    left: g.size(12),
    zIndex: 1,
  },
  greyedOut: {
    ...g.bodySmall,
    color: g.primaryBlue,
    opacity: 0.8,
    marginLeft: g.size(12),
  },
  inputContainer: {
    marginHorizontal: g.size(16),
  },
  label: {
    ...g.labelMedium,
    color: g.neutral600,
  },
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
  },
  maskedView: {
    flex: 1,
  },
  payButton: {
    backgroundColor: g.primaryBlue,
    borderRadius: g.size(18),
    paddingVertical: g.size(8),
    paddingHorizontal: g.size(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonAndroid: {
    borderRadius: g.size(22),
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
  },
  payButtonLabel: {
    ...g.labelMedium,
    color: g.white,
  },
  paymentHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scrollContent: {
    flexGrow: 1,
    gap: g.size(20),
    paddingHorizontal: g.size(16),
    paddingTop: g.size(24),
  },
  sectionContainer: {
    gap: g.size(12),
  },
  title: {
    ...g.titleLarge,
    color: g.neutral700,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(16),
    paddingLeft: g.size(20),
    marginTop: g.size(20),
  },
});

export default function Billing() {
  const tabBarHeight = useBottomTabBarHeight();
  const { data: invoices, isLoading: loadingInvoices, refetch: refetchInvoices } = useInvoices();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');

  const {
    mutate: onPaymentIntentCapture,
    isSuccess: paymentIntentSuccess,
    isPending: paymentIntentPending,
  } = usePaymentIntentCapture();
  const {
    mutate: onPaymentNoticeSubmit,
    isSuccess: paymentNoticeSuccess,
    isPending: paymentNoticePending,
    error: paymentNoticeError,
  } = usePaymentNoticeSubmit();
  const {
    mutate: onPaymentIntentCancel,
  } = usePaymentIntentCancel();
  const {
    data: paymentNotices,
    isLoading: loadingPaymentNotices,
    refetch: refetchPaymentNotices,
  } = usePaymentNotices();

  const disabled = Number(amount) < 1 || paymentNoticePending || paymentIntentPending;

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchPaymentNotices();
    await refetchInvoices();
    setRefreshing(false);
  };

  const getPaymentMethod = async (clientSecret: string) => {
    const { error: initPaymentError } = await initPaymentSheet({
      merchantDisplayName: 'Brewer Digital',
      paymentIntentClientSecret: clientSecret,
      allowsDelayedPaymentMethods: false,
    });
    const { error: presentPaymentError } = await presentPaymentSheet();
    const canceled = presentPaymentError?.code === 'Canceled';
    if (initPaymentError || (presentPaymentError && !canceled)) { setError('Something went wrong. Please try again.'); }
    return initPaymentError || presentPaymentError;
  };

  const handleSubmit = async () => {
    setButtonLoading(true);
    const cents = Number(amount) * 100;
    if (Number.isNaN(cents)) { setError('Please enter a valid dollar amount'); return; }
    // Clear errors on submit
    if (error) setError('');
    const paymentIntent = await getPaymentIntent(cents);
    if (!paymentIntent.paymentIntentId) { setError('Something went wrong. Please try again.'); return; }
    setPaymentIntentId(paymentIntent.paymentIntentId);
    const paymentErrors = await getPaymentMethod(paymentIntent.clientSecret);
    if (!paymentErrors) onPaymentNoticeSubmit(amount);
    setButtonLoading(false);
  };

  useEffect(() => {
    const capturePayment = async () => {
      if (!paymentNoticeSuccess || !paymentIntentId) return;
      onPaymentIntentCapture(paymentIntentId);
      setPaymentIntentId('');
    };
    capturePayment();
  }, [paymentNoticeSuccess]);

  useEffect(() => {
    const cancelPayment = async () => {
      if (!paymentNoticeError) return;
      onPaymentIntentCancel(paymentIntentId);
      setPaymentIntentId('');
    };
    cancelPayment();
  }, [paymentNoticeError]);

  useEffect(() => {
    const clearForm = async () => {
      if (paymentIntentSuccess) {
        setAmount('');
        refetchPaymentNotices();
      }
    };
    clearForm();
  }, [paymentIntentSuccess]);

  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={s.container}>
          <Header hideBackButton />
          <View style={s.titleContainer}>
            <Feather name="credit-card" size={g.size(36)} color={g.neutral700} />
            <Text style={s.title}>
              Billing
            </Text>
          </View>
          {loadingPaymentNotices || loadingInvoices
            ? <ActivityIndicator size="large" color={g.primaryBlue} style={s.loading} />
            : (
              <>
                {invoices?.length ? (
                  <>
                    <View style={s.inputContainer}>
                      <Feather
                        style={[
                          s.dollarSign,
                          Platform.OS === 'android' && s.androidDollarSign,
                        ]}
                        name="dollar-sign"
                        size={g.size(20)}
                        color={g.neutral400}
                      />
                      <Input
                        onChange={setAmount}
                        value={amount}
                        placeholder="Enter dollar amount to pay"
                        keyboardType="numeric"
                        error={null}
                        label=""
                        name="amount"
                        onFocus={() => { }}
                        type="text"
                        onSubmitEditing={() => { }}
                        autoCapitalize="none"
                        textContentType="none"
                        returnKeyType="default"
                        style={{ paddingLeft: g.size(36), color: g.neutral900 }}
                      />
                      <View style={[s.buttonContainer, Platform.OS === 'android' && s.androidButtonContainer]}>
                        <TouchableOpacity
                          style={[
                            s.payButton,
                            disabled && s.disabled,
                            Platform.OS === 'android' && s.payButtonAndroid,
                          ]}
                          onPress={handleSubmit}
                          disabled={disabled}
                        >
                          {paymentNoticePending || paymentIntentPending || buttonLoading
                            ? <ActivityIndicator color={g.white} />
                            : <Text style={s.payButtonLabel}>Pay</Text>
                          }
                        </TouchableOpacity>
                      </View>
                      {!!error && <Text style={s.greyedOut}>{error}</Text>}
                    </View>
                    <MaskedView
                      style={s.maskedView}
                      maskElement={(
                        <LinearGradient
                          style={s.maskedView}
                          colors={[g.transparent, g.white]}
                          locations={[0, 0.06]}
                        />
                      )}
                    >
                      <ScrollView
                        contentContainerStyle={[
                          s.scrollContent,
                          { paddingBottom: tabBarHeight + g.size(32) },
                        ]}
                        scrollEnabled={!!paymentNotices?.length || !!invoices?.length}
                        refreshControl={(
                          <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={g.primaryBlue}
                            colors={[g.primaryBlue]}
                            progressViewOffset={g.size(40)}
                          />
                        )}
                      >
                        {!!paymentNotices?.length && (
                          <View style={s.sectionContainer}>
                            <Text style={s.label}>Payment History</Text>
                            {paymentNotices?.map((notice: PaymentNotice) => (
                              <View key={notice.id} style={s.paymentHistoryItem}>
                                <Text style={{ color: g.neutral900 }}>
                                  $
                                  {notice.amount.value.toFixed(2)}
                                </Text>
                                <Text style={{ color: g.neutral900 }}>{formatDate(notice.created)}</Text>
                              </View>
                            ))}
                          </View>
                        )}
                        {!!invoices.length && (
                          <View style={s.sectionContainer}>
                            <Text style={s.label}>Invoices</Text>
                            {invoices.map((invoice: Invoice) => (
                              <InvoiceCard
                                key={invoice.id}
                                invoice={invoice}
                              />
                            ))}
                          </View>
                        )}
                      </ScrollView>
                    </MaskedView>
                  </>
                ) : (
                  <ZeroState
                    image={receipt}
                    imageAspectRatio={1.56}
                    text="You have no available invoices"
                  />
                )}
              </>
            )}
        </View>
      </TouchableWithoutFeedback>
    </StripeProvider>
  );
}