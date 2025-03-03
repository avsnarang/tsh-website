interface RetryOptions {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  factor?: number;
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    initialDelay = 1000,
    maxDelay = 5000,
    factor = 2,
  } = options;

  let attempt = 1;
  let delay = initialDelay;

  while (attempt <= maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      
      delay = Math.min(delay * factor, maxDelay);
      attempt++;
    }
  }

  throw new Error('Maximum retry attempts reached');
}