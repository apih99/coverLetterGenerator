import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    marginBottom: 2,
  },
  date: {
    fontSize: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  recipient: {
    fontSize: 10,
    marginBottom: 2,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
    marginTop: 20,
    textAlign: 'justify',
  },
  paragraph: {
    marginBottom: 10,
  },
  closing: {
    marginTop: 20,
    fontSize: 10,
  },
  signature: {
    marginTop: 30,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

// Define props interface for the PDF component
interface CoverLetterPDFProps {
  coverLetterText: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  companyName?: string;
  position?: string;
}

// PDF Document Component
const CoverLetterPDF: React.FC<CoverLetterPDFProps> = ({ 
  coverLetterText, 
  userName = 'Your Name', 
  userEmail = 'your.email@example.com',
  userPhone = '123-456-7890',
  companyName = ''
}) => {
  // Format current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Split the cover letter into paragraphs
  const paragraphs = coverLetterText.split('\n\n').filter((p: string) => p.trim() !== '');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with user info */}
        <View style={styles.header}>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.contact}>{userEmail}</Text>
          <Text style={styles.contact}>{userPhone}</Text>
        </View>
        
        {/* Date */}
        <Text style={styles.date}>{currentDate}</Text>
        
        {/* Recipient info if available */}
        {companyName && (
          <>
            <Text style={styles.recipient}>Hiring Manager</Text>
            <Text style={styles.recipient}>{companyName}</Text>
          </>
        )}
        
        {/* Cover letter content */}
        <View style={styles.content}>
          {paragraphs.map((paragraph: string, index: number) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>
        
        {/* Closing */}
        <Text style={styles.closing}>Sincerely,</Text>
        <Text style={styles.signature}>{userName}</Text>
      </Page>
    </Document>
  );
};

// Define props interface for the download button component
interface PDFDownloadButtonProps {
  coverLetterText: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  companyName: string;
  position: string;
}

// Download button component
export const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ 
  coverLetterText, 
  userName, 
  userEmail, 
  userPhone,
  companyName,
  position
}) => {
  return (
    <PDFDownloadLink
      document={
        <CoverLetterPDF 
          coverLetterText={coverLetterText}
          userName={userName}
          userEmail={userEmail}
          userPhone={userPhone}
          companyName={companyName}
        />
      }
      fileName={`Cover_Letter_${companyName.replace(/\s+/g, '_')}_${position.replace(/\s+/g, '_')}.pdf`}
      style={{
        padding: '10px 15px',
        backgroundColor: '#4F46E5',
        color: 'white',
        borderRadius: '4px',
        textDecoration: 'none',
        display: 'inline-block',
        marginTop: '20px',
        cursor: 'pointer',
      }}
    >
      {({ loading }) =>
        loading ? 'Generating PDF...' : 'Download as PDF'
      }
    </PDFDownloadLink>
  );
};

export default CoverLetterPDF; 