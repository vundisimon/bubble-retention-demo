import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react"; 
import { createTemplate } from "@/utils/klaviyo/templates";
import axios from "axios";
import DOMPurify from 'dompurify';

interface HTMLRendererProps {
  htmlContent: string; // HTML content as a string
  isOpen: boolean; // Controls whether the dialog is open or closed
  onClose: () => void; // Callback to close the dialog
}

const HTMLRenderer: React.FC<HTMLRendererProps> = ({ htmlContent, isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleApprove = async () => {
    setIsSubmitting(true); 
    try {
      const response = await axios.post('/api/createTemplate', {
        name: 'Sauti first Test HTML Template',
        html: htmlContent,
      });
      console.log('Template created successfully:', response.data);
      setIsSubmitting(false); 
    } catch (error) {
      console.error('Failed to create template:', error);
    }
  };

   // Sanitize HTML while preserving formatting
  //  const sanitizedHTML = DOMPurify.sanitize(htmlContent, {
  //   WHOLE_DOCUMENT: true,
  //   ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  //   ADD_TAGS: ['style'],
  //   ADD_ATTR: ['target', 'style']
  // });

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-3xl p-6 rounded-lg shadow-lg max-h-[90vh] h-[90vh] flex flex-col">
         {/* Close Button */}
         <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">Your Email Design</AlertDialogTitle>
        </AlertDialogHeader>
        {/* Rendered HTML Content */}
        {/* <div
          className="border rounded-md p-4 bg-gray-50 overflow-auto max-h-[calc(100%-100px)] h-[calc(100%-100px)]"
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        /> */}
        {/* Using an iframe to render the HTML */}
          <iframe
            className="border rounded-md p-4 bg-gray-50 overflow-auto max-h-[calc(100%-100px)] h-[calc(100%-100px)]"
            srcDoc={htmlContent}
            style={{ width: '100%', height: '100%', border: 'none' }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            title="HTML Renderer"
          />
        {/* Approve Button */}
        <Button
          className="absolute bottom-4 left-4 bg-[#F7B928] text-black hover:bg-[#dca717]"
          onClick={onClose}
          
        >
          Not satisfied
        </Button>
        {/* Approve Button */}
        <Button
          className="absolute bottom-4 right-4 bg-[#F7B928] text-black hover:bg-[#dca717]"
          onClick={handleApprove}
          disabled={isSubmitting}
        >
          Send to Klaviyo
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default HTMLRenderer;
