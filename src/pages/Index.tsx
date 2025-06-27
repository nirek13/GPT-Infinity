
import { useState } from "react";
import { Copy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRunAttack = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please paste some AI-generated text to process.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock adversarial attack - in reality this would call an API
    const attackedText = inputText
      .replace(/\b(the|and|or|but|in|on|at|to|for|of|with|by)\b/g, (match) => {
        const synonyms = {
          'the': 'that',
          'and': 'plus',
          'or': 'alternatively',
          'but': 'however',
          'in': 'within',
          'on': 'upon',
          'at': 'near',
          'to': 'toward',
          'for': 'regarding',
          'of': 'from',
          'with': 'alongside',
          'by': 'through'
        };
        return synonyms[match as keyof typeof synonyms] || match;
      })
      .replace(/\./g, '. ')
      .replace(/\s+/g, ' ')
      .trim();
    
    setOutputText(attackedText);
    setIsProcessing(false);
    
    toast({
      title: "Attack completed",
      description: "Text has been successfully modified to bypass AI detection.",
    });
  };

  const handleCopyOutput = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Modified text copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900 mb-3">
            GPT Infinity
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Advanced AI Detection Bypass Technology
          </p>
        </div>

        {/* Main Interface */}
        <div className="space-y-8">
          {/* Input Section */}
          <div className="space-y-3">
            <label htmlFor="input-text" className="block text-sm font-semibold text-gray-900 tracking-tight">
              Paste AI-Generated Text
            </label>
            <Textarea
              id="input-text"
              placeholder="Enter your AI-generated text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] text-base border-gray-200 focus:border-gray-900 focus:ring-gray-900 rounded-xl resize-none transition-colors"
            />
          </div>

          {/* Run Attack Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleRunAttack}
              disabled={isProcessing}
              className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Run Attack</span>
                </div>
              )}
            </Button>
          </div>

          {/* Output Section */}
          {outputText && (
            <div className="space-y-3 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-900 tracking-tight">
                  Modified Text
                </label>
                <Button
                  onClick={handleCopyOutput}
                  variant="outline"
                  size="sm"
                  className="px-4 py-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-all duration-200"
                >
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  Copy Output
                </Button>
              </div>
              
              <Card className="p-6 bg-gray-50 border-gray-200 rounded-xl">
                <div className="text-base text-gray-900 leading-relaxed whitespace-pre-wrap">
                  {outputText}
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Bypass AI detection systems with advanced text modification techniques
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
