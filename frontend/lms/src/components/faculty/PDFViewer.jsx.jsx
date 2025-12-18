import { X, Download } from 'lucide-react';

export function PDFViewer({ submission, onClose }) {
  // Mock PDF content (replace with real PDF later)
  const content = `
Assignment Submission

Student Name : ${submission.name}
Roll Number  : ${submission.rollNo}
Submitted On : ${submission.submissionDate}

--------------------------------------------------

Question 1:
Explain Object Oriented Programming.

Answer:
Object Oriented Programming (OOP) is a programming paradigm based on the concept
of objects. The core principles of OOP are Encapsulation, Inheritance,
Polymorphism, and Abstraction.

Encapsulation hides internal state and exposes only required behavior.
Inheritance allows reuse of existing code.
Polymorphism allows one interface to have multiple implementations.
Abstraction hides complexity and shows only essential details.

--------------------------------------------------

Question 2:
Explain Polymorphism with example.

Answer:
Polymorphism allows different objects to respond differently to the same method.

Example:

class Animal {
  speak() {
    console.log("Animal speaks");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog barks");
  }
}

const animal = new Dog();
animal.speak(); // Dog barks

--------------------------------------------------

Conclusion:
OOP helps in building scalable, reusable and maintainable software systems.

References:
1. Clean Code – Robert C. Martin
2. Design Patterns – Gang of Four
`;

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = submission.fileName || 'submission.txt';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div>
            <h2 className="text-white text-lg">{submission.fileName}</h2>
            <p className="text-gray-400 text-sm">
              {submission.name} ({submission.rollNo})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Download className="w-4 h-4" />
              Download
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-10">
            <pre
              className="whitespace-pre-wrap text-gray-900 leading-relaxed"
              style={{ fontFamily: 'Georgia, serif', fontSize: '14px' }}
            >
              {content}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
