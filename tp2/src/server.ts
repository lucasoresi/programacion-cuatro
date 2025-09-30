import { makeApp } from './app.js';

const PORT = process.env.PORT || 3000;

const app = makeApp();

app.listen(PORT, () => {
  console.log(`🍕 Pizzeria API running on port ${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});