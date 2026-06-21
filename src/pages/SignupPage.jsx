// src/pages/SignupPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Footer from '../components/ui/Footer';
import {
  SignupCard, SignupHeader, GoogleSignupButton,
  OrDivider, SignupFields, PrivacyNotice,
} from '../components/sections/SignupSections';

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="signup-shell">
      <SignupCard>
        <SignupHeader />
        <GoogleSignupButton onClick={() => navigate('/profiles')} />
        <OrDivider />
        <SignupFields email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
        <Button variant="primary" fullWidth onClick={() => navigate('/profiles')} style={{ marginBottom: 20 }}>
          INITIALIZE_ACCOUNT
        </Button>
        <PrivacyNotice />
        <Footer variant="signup" onLogin={() => navigate('/profiles')} />
        <Footer variant="signup-status" />
      </SignupCard>
    </div>
  );
}
