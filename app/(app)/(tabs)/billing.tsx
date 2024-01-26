import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
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
import { Header, InvoiceCard, ZeroState } from '@components';
import receipt from '@assets/images/cc-payment.svg';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: g.neutral100,
  },
  disabled: {
    opacity: 0.7,
  },
  input: {
    ...g.bodyMedium,
    color: g.neutral900,
    flex: 1,
    paddingVertical: g.hs(8),
  },
  inputContainer: {
    ...g.cardShadow,
    backgroundColor: g.neutral200,
    borderRadius: g.ms(50),
    height: g.ms(32),
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: g.ws(16),
    marginTop: g.hs(16),
    paddingLeft: g.ms(8),
  },
  inputContainerError: {
    backgroundColor: g.error,
  },
  inputErrorLabel: {
    ...g.bodySmall,
    color: g.severityRed,
    opacity: 0.8,
    position: 'absolute',
    right: g.ms(0),
    bottom: -g.ms(20),
  },
  label: {
    ...g.labelMedium,
    color: g.neutral600,
  },
  loading: {
    flex: 1,
    paddingBottom: g.hs(120),
  },
  maskedView: {
    flex: 1,
  },
  payButton: {
    backgroundColor: g.primaryBlue,
    borderRadius: g.ms(50),
    height: '100%',
    minWidth: g.ms(64),
    paddingHorizontal: g.ms(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonLabel: {
    ...g.labelMedium,
    color: g.white,
  },
  paymentAmount: {
    ...g.labelSmall,
    color: g.neutral900,
  },
  paymentDate: {
    ...g.bodyMedium,
    color: g.neutral600,
  },
  paymentHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scrollContent: {
    flexGrow: 1,
    gap: g.hs(20),
    paddingHorizontal: g.ws(16),
    paddingTop: g.hs(24),
  },
  sectionContainer: {
    gap: g.hs(12),
  },
  title: {
    ...g.titleLarge,
    color: g.neutral700,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.ms(16),
    paddingLeft: g.ws(16),
    marginTop: g.hs(20),
  },
});

export default function Billing() {
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
      <View style={s.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <Header hideBackButton />
            <View style={s.titleContainer}>
              <Feather name="credit-card" size={g.hs(36)} color={g.neutral700} />
              <Text style={s.title}>
                Billing
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {loadingPaymentNotices || loadingInvoices
          ? <ActivityIndicator size="large" color={g.primaryBlue} style={s.loading} />
          : (
            <>
              {invoices?.length ? (
                <View style={s.container}>
                  <View style={[s.inputContainer, error && s.inputContainerError]}>
                    <Feather
                      name="dollar-sign"
                      size={g.ms(20)}
                      color={g.neutral400}
                    />
                    <TextInput
                      style={s.input}
                      onChange={(e) => setAmount(e.nativeEvent.text)}
                      value={amount}
                      placeholder="Enter dollar amount to pay"
                      keyboardType="decimal-pad"
                      onSubmitEditing={() => Keyboard.dismiss()}
                      autoCapitalize="none"
                      textContentType="none"
                      returnKeyType="done"
                    />
                    <TouchableOpacity
                      style={[
                        s.payButton,
                        disabled && s.disabled,
                      ]}
                      onPress={handleSubmit}
                      disabled={disabled}
                    >
                      {paymentNoticePending || paymentIntentPending || buttonLoading
                        ? <ActivityIndicator color={g.white} size="small" />
                        : <Text style={s.payButtonLabel}>Pay</Text>}
                    </TouchableOpacity>
                    {!!error && <Text style={s.inputErrorLabel}>{error}</Text>}
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
                        { paddingBottom: g.tabBarHeight + g.hs(120) }
                      ]}
                      scrollEnabled={!!paymentNotices?.length || !!invoices?.length}
                      refreshControl={(
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                          tintColor={g.primaryBlue}
                          colors={[g.primaryBlue]}
                          progressViewOffset={g.hs(20)}
                        />
                      )}
                    >
                      {!!paymentNotices?.length && (
                        <View style={s.sectionContainer}>
                          <Text style={s.label}>Payment History</Text>
                          {paymentNotices?.map((notice: PaymentNotice) => (
                            <View key={notice.id} style={s.paymentHistoryItem}>
                              <Text style={s.paymentAmount}>
                                $
                                {notice.amount.value.toFixed(2)}
                              </Text>
                              <Text style={s.paymentDate}>{formatDate(notice.created)}</Text>
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
                </View>
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
    </StripeProvider>
  );
}
