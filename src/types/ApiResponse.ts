export interface AlphaVantageDailyEntry {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

export interface AlphaVantageResponse {
  'Time Series (Daily)'?: Record<string, AlphaVantageDailyEntry>;
  'Error Message'?: string;
  'Note'?: string;
  'Information'?: string;
}
