import { useState } from "react";
import { Copy, Zap, Sparkles } from "lucide-react";
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

  try {
    const res = await fetch('http://localhost:8080/api/attack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: inputText,
        attacks: ['homoglyph'], // You can add more attacks here later
      }),
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    setOutputText(data.transformed);

    toast({
      title: "Attack completed",
      description: "Text has been successfully modified to bypass AI detection.",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: `Failed to run attack: ${(error as Error).message}`,
      variant: "destructive",
    });
  } finally {
    setIsProcessing(false);
  }
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
    <div className="min-h-screen bg-gray-50 relative">
      {/* Subtle rainbow backlights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-gradient-to-br from-green-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-8 py-20 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <h1 className="text-6xl font-black tracking-tight text-gray-900 mb-2">
              GPT Infinity
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400 rounded-full opacity-60"></div>
          </div>
          <p className="text-xl text-gray-600 font-semibold mb-4">
            Advanced AI Detection Bypass
          </p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="space-y-12">
          {/* Input Section */}
          <div className="space-y-4">
            <label htmlFor="input-text" className="block text-lg font-bold text-gray-900">
              Input Text
            </label>
            <div className="relative group">
              <Textarea
                id="input-text"
                placeholder="Paste your AI-generated text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] text-base bg-white border-2 border-gray-200 focus:border-gray-900 focus:ring-0 rounded-2xl resize-none transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg p-6"
              />
              {inputText && (
                <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 via-yellow-400/20 via-green-400/20 via-blue-400/20 to-purple-400/20 rounded-2xl blur-sm -z-10 opacity-60"></div>
              )}
            </div>
          </div>

          {/* Run Attack Button */}
          <div className="flex justify-center">
            <div className="relative group">
              <Button
                onClick={handleRunAttack}
                disabled={isProcessing}
                className="px-12 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5" />
                    <span>Run Attack</span>
                  </div>
                )}
              </Button>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
            </div>
          </div>

          {/* Output Section */}
          {outputText && (
            <div className="space-y-4 animate-in fade-in duration-500 slide-in-from-bottom-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-bold text-gray-900">
                  Modified Text
                </label>
                <div className="relative group">
                  <Button
                    onClick={handleCopyOutput}
                    variant="outline"
                    className="px-6 py-3 border-2 border-gray-300 hover:border-gray-900 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                </div>
              </div>
              
              <div className="relative group">
                <Card className="p-8 bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-base text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {outputText}
                  </div>
                </Card>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">
              Powered by advanced text modification
            </span>
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;