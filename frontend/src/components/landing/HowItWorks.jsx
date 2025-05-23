const steps = [
    "Sign up and get free credits",
    "Choose or create your AI agent",
    "Get work done in seconds",
  ];
  
  const HowItWorks = () => (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-md w-64">
            <div className="text-2xl font-bold mb-4">{idx + 1}</div>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
  
  export default HowItWorks;
  