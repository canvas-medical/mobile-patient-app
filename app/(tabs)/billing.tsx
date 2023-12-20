import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView, Text, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { Input, Screen, Header, InvoiceCard } from '@components';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { initPaymentSheet, presentPaymentSheet, StripeProvider } from '@stripe/stripe-react-native';
import { Invoice, PaymentNotice } from '@interfaces';
import {
  getPaymentIntent,
  useInvoices,
  usePaymentIntentCapture,
  usePaymentNotices,
  usePaymentNoticeSubmit
} from '@services';
import { g } from '@styles';

const s = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    right: 0,
    top: g.size(18),
    height: g.size(36),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: g.size(20),
    padding: g.size(32),
    paddingTop: 0,
    marginBottom: g.size(200)
  },
  disabled: {
    opacity: 0.7,
  },
  dollarSign: {
    position: 'absolute',
    top: g.size(26),
    left: g.size(12),
  },
  error: {
    ...g.bodySmall,
    color: g.white,
    opacity: 0.8,
    marginTop: g.size(12),
    marginLeft: g.size(12),
  },
  inputContainer: {
    flex: 1,
    alignSelf: 'center',
    width: g.width * 0.85,
  },
  label: {
    ...g.labelMedium,
    color: g.white,
  },
  payButton: {
    ...g.bodyLarge,
    color: g.primaryBlue,
    overflow: 'hidden',
    backgroundColor: g.white,
    borderRadius: g.size(18),
    paddingVertical: g.size(8),
    paddingHorizontal: g.size(16),
  },
  paymentHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subContainer: {
    gap: g.size(12),
  },
  title: {
    ...g.titleLarge,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(20),
    paddingLeft: g.size(4)
  }
});

export default function Billing() {
  const { data: invoices, isLoading: loadingInvoices } = useInvoices();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');

  const { mutate: onPaymentIntentCapture, isSuccess: paymentIntentSuccess, isPending: paymentIntentPending } = usePaymentIntentCapture();
  const { mutate: onPaymentNoticeSubmit, isSuccess: paymentNoticeSuccess, isPending: paymentNoticePending } = usePaymentNoticeSubmit();
  const { data: paymentNotices, isLoading: paymentNoticesLoading, refetch } = usePaymentNotices();

  const disabled = Number(amount) < 1 || paymentNoticePending || paymentIntentPending;

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
    const clearForm = async () => {
      if (paymentIntentSuccess) {
        setAmount('');
        refetch();
      }
    };
    clearForm();
  }, [paymentIntentSuccess]);

  const formattedDate = (date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'utc' });
  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY}>
      <Screen>
        <Header />
        <KeyboardAvoidingView style={{ height: g.height }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView>
              <View style={s.container}>
                <View style={s.titleContainer}>
                  <FontAwesome5 name="file-invoice-dollar" size={g.size(36)} color="white" />
                  <Text style={s.title}>
                    Billing
                  </Text>
                </View>
                <View style={s.inputContainer}>
                  <Feather style={s.dollarSign} name="dollar-sign" size={g.size(20)} color={g.neutral200} />
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
                    style={{ paddingLeft: g.size(36), color: g.white }}
                    selectionColor={g.white}
                  />
                  <View style={s.buttonContainer}>
                    <TouchableOpacity onPress={handleSubmit} disabled={disabled}>
                      {paymentNoticePending || paymentIntentPending || buttonLoading
                        ? <ActivityIndicator size="small" style={s.payButton} color={g.primaryBlue} />
                        : <Text style={[s.payButton, disabled && s.disabled]}>Pay</Text>
                        }
                    </TouchableOpacity>
                  </View>
                  <Text style={s.error}>{error}</Text>
                </View>
                <View style={s.subContainer}>
                  {(paymentNotices?.length || paymentNoticesLoading) && <Text style={s.label}>Payment History</Text>}
                  {paymentNoticesLoading
                    ? <ActivityIndicator size="large" color={g.white} />
                    : paymentNotices?.map((notice: PaymentNotice) => (
                      <View key={notice.id} style={s.paymentHistoryItem}>
                        <Text style={{ color: g.white }}>
                          $
                          {notice.amount.value.toFixed(2)}
                        </Text>
                        <Text style={{ color: g.white }}>{formattedDate(notice.created)}</Text>
                      </View>
                    ))}
                </View>
                <View style={s.subContainer}>
                  {(invoices?.length || loadingInvoices) && <Text style={s.label}>Invoices</Text>}
                  {loadingInvoices
                    ? <ActivityIndicator size="large" color={g.white} />
                    : invoices.map((invoice: Invoice) => (
                      <InvoiceCard
                        key={invoice.id}
                        invoice={invoice}
                      />
                    ))}
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Screen>
    </StripeProvider>
  );
}
