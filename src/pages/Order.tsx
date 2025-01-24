import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Paper,
  SelectChangeEvent,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('your_publishable_key');

interface OrderItem {
  name: string;
  price: string;
  quantity: number;
}

interface DeliveryInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  deliveryTime: string;
  specialInstructions: string;
}

const PaymentForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message || 'An error occurred');
      setProcessing(false);
    } else {
      // Here you would typically send the paymentMethod.id to your server
      console.log('Payment successful:', paymentMethod);
      onSuccess();
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        disabled={!stripe || processing}
        fullWidth
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
};

const Order: React.FC = () => {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryTime: '',
    specialInstructions: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const itemName = params.get('item');
    if (itemName) {
      setCart([{ name: itemName, price: 'Price to be confirmed', quantity: 1 }]);
    }
  }, [location]);

  const validateCart = () => {
    return cart.length > 0;
  };

  const validateDeliveryInfo = () => {
    const newErrors: { [key: string]: boolean } = {};
    const requiredFields: (keyof DeliveryInfo)[] = ['name', 'phone', 'email', 'address', 'deliveryTime'];
    
    requiredFields.forEach(field => {
      if (!deliveryInfo[field]) {
        newErrors[field] = true;
      }
    });

    // Email validation
    if (deliveryInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryInfo.email)) {
      newErrors.email = true;
    }

    // Phone validation
    if (deliveryInfo.phone && !/^\+?[\d\s-]{10,}$/.test(deliveryInfo.phone)) {
      newErrors.phone = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (activeStep) {
      case 0:
        isValid = validateCart();
        break;
      case 1:
        isValid = validateDeliveryInfo();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleDeliveryInfoChange = (field: keyof DeliveryInfo) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const value = event.target.value;
    setDeliveryInfo(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const newCart = [...cart];
    newCart[index] = { ...newCart[index], quantity: newQuantity };
    setCart(newCart);
  };

  const renderCart = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Order
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <Grid container spacing={3}>
          {cart.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography color="primary">{item.price}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        type="number"
                        label="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                        InputProps={{ inputProps: { min: 1 } }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          const newCart = cart.filter((_, i) => i !== index);
                          setCart(newCart);
                        }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  const renderDeliveryDetails = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        Delivery Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            value={deliveryInfo.name}
            onChange={handleDeliveryInfoChange('name')}
            required
            error={errors.name}
            helperText={errors.name ? 'Name is required' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            value={deliveryInfo.phone}
            onChange={handleDeliveryInfoChange('phone')}
            required
            error={errors.phone}
            helperText={errors.phone ? 'Valid phone number is required' : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={deliveryInfo.email}
            onChange={handleDeliveryInfoChange('email')}
            required
            error={errors.email}
            helperText={errors.email ? 'Valid email is required' : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Delivery Address"
            value={deliveryInfo.address}
            onChange={handleDeliveryInfoChange('address')}
            required
            error={errors.address}
            helperText={errors.address ? 'Address is required' : ''}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required error={errors.deliveryTime}>
            <InputLabel>Preferred Delivery Time</InputLabel>
            <Select
              value={deliveryInfo.deliveryTime}
              onChange={handleDeliveryInfoChange('deliveryTime')}
              label="Preferred Delivery Time"
            >
              <MenuItem value="asap">As Soon As Possible</MenuItem>
              <MenuItem value="30min">Within 30 Minutes</MenuItem>
              <MenuItem value="60min">Within 1 Hour</MenuItem>
              <MenuItem value="schedule">Schedule for Later</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Special Instructions"
            value={deliveryInfo.specialInstructions}
            onChange={handleDeliveryInfoChange('specialInstructions')}
            multiline
            rows={3}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderPayment = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payment Details
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        {cart.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>
              {item.name} x {item.quantity}
            </Typography>
            <Typography>{item.price}</Typography>
          </Box>
        ))}
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6">Total: To be calculated</Typography>
        </Box>
      </Paper>
      <Elements stripe={stripePromise}>
        <PaymentForm onSuccess={() => setActiveStep(3)} />
      </Elements>
    </Box>
  );

  const renderConfirmation = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        Order Confirmed!
      </Typography>
      <Typography paragraph>
        Thank you for your order. We'll send you an email confirmation shortly.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Delivery Details:
      </Typography>
      <Typography>Name: {deliveryInfo.name}</Typography>
      <Typography>Address: {deliveryInfo.address}</Typography>
      <Typography>Delivery Time: {deliveryInfo.deliveryTime}</Typography>
    </Box>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderCart();
      case 1:
        return renderDeliveryDetails();
      case 2:
        return renderPayment();
      case 3:
        return renderConfirmation();
      default:
        return 'Unknown step';
    }
  };

  const steps = ['Cart', 'Delivery Details', 'Payment', 'Confirmation'];

  return (
    <Box sx={{ pt: 10, pb: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" gutterBottom>
            Online Order
          </Typography>
          <Box sx={{ width: '100%', mb: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box sx={{ mt: 4 }}>{getStepContent(activeStep)}</Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={() => {
                  // Handle order completion
                  console.log('Order completed:', { cart, deliveryInfo });
                }}
              >
                Place Order
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && !validateCart()) ||
                  (activeStep === 1 && !validateDeliveryInfo())
                }
              >
                {activeStep === steps.length - 2 ? 'Proceed to Payment' : 'Next'}
              </Button>
            )}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Order;
