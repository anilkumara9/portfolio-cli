import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  isDarkMode?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isDarkMode = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // EmailJS configuration - You'll need to replace these with your actual EmailJS IDs
      const serviceId = 'service_portfolio'; // Replace with your service ID
      const templateId = 'template_contact'; // Replace with your template ID
      const publicKey = 'your_public_key'; // Replace with your public key
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        message: formData.message,
        to_email: 'anilkumarmeda6@gmail.com', // Your email
      };
      
      // For now, we'll simulate the email sending since EmailJS needs setup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Uncomment this when EmailJS is configured:
      // await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', company: '', message: '' });
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact directly via email.');
      console.error('Email send error:', error);
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="dev-card p-6">
      <div className="mb-6">
        <h2 className="dev-heading text-xl flex items-center gap-2 mb-2">
          <Mail className="h-5 w-5" />
          Contact Me
        </h2>
        <p className="dev-caption">
          Let's discuss opportunities and collaborations
        </p>
      </div>
      <div>
        {submitStatus === 'success' ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
            <div>
              <h3 className="font-semibold text-lg">Message Sent Successfully!</h3>
              <p className="text-sm text-muted-foreground">
                Thank you for reaching out. Meda will get back to you soon!
              </p>
            </div>
          </div>
        ) : submitStatus === 'error' ? (
          <div className="text-center py-8 space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            <div>
              <h3 className="font-semibold text-lg">Message Failed to Send</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {errorMessage}
              </p>
              <Button 
                onClick={() => setSubmitStatus('idle')}
                variant="outline"
                size="sm"
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="dev-caption font-semibold">Name *</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="dev-caption font-semibold">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="company" className="dev-caption font-semibold">Company/Organization</label>
              <input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                placeholder="Your company name (optional)"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="dev-caption font-semibold">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm min-h-[100px] resize-vertical"
                placeholder="Tell me about your project, job opportunity, or collaboration idea..."
              />
            </div>
            
            <button 
              type="submit" 
              className="dev-button-primary w-full group" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </button>
            
            <p className="dev-caption text-center">
              Or reach out directly: <a href="mailto:anilkumarmeda6@gmail.com" className="text-primary hover:underline">anilkumarmeda6@gmail.com</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;