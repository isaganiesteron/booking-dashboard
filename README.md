# Booking.com Performance Dashboard

## Overview

This project aims to build a comprehensive system that pulls Booking.com transaction data, analyzes performance metrics from both Google Ads and organic bookings, and presents actionable insights through an intuitive dashboard. The system will track Google Ads revenue, calculate the likelihood of
bookings converting to stays, and offer marketing strategy suggestions based on the data.

## Key Features

-   **Booking Data Management**:
    -   Fetch booking data via the Booking.com API.
    -   Store the transaction data in a relational database (PostgreSQL/MySQL).
-   **Booking Classification**:
    -   Automatically classify bookings as either Ads-based or Organic, depending on their source.
-   **Ad Revenue Tracking**:
    -   Track Google Ads spend and correlate it with booking data to analyze return on investment (ROI).
    -   Display revenue generated through paid ads.
-   **Likelihood of Staying**:
    -   Use additional data from the Booking.com API to calculate the probability of a booking converting into a completed stay.
-   **Statistics & Insights**:
    -   Analyze various labels (e.g., articles, campaigns) to determine top-performing content.
    -   Provide insights on the highest-converting links to refine marketing strategies.
-   **Dashboard**:
    -   A user-friendly interface to visualize:
        -   Booking data (Ads vs Organic)
        -   Ad performance
        -   Trends in organic bookings
        -   Conversion likelihood and marketing performance metrics.

## Tech Stack

-   **Frontend**:
    -   Built with [Next.js](https://nextjs.org/) (React) using TypeScript for a scalable and performant user interface.
-   **Backend**:
    -   API Routes in Next.js or a custom Node.js/Express server to handle API interactions and business logic.
-   **Database**:
    -   PostgreSQL or MySQL for storing and managing booking and transaction data.

## Installation Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/booking-performance-dashboard.git

    ```

2. Install dependencies:

    ```bash
    cd booking-performance-dashboard
    npm install

    ```

3. Set up environment variables in a .env file. You'll need API credentials from Booking.com, Google Ads API keys, and database connection details.

    ```bash
     #Example .env file
     DATABASE_URL=postgresql://user:password@localhost:5432/dbname
     BOOKING_API_KEY=your_booking_api_key
     GOOGLE_ADS_API_KEY=your_google_ads_key

    ```

4. Run database migrations:

    ```bash
    npm run migrate

    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

### Fetch Data:

The system will automatically pull booking data from the Booking.com API at regular intervals. Data can also be manually fetched via the dashboard.

### View Insights:

Access the dashboard to view performance metrics, analyze booking trends, and track ad revenue.

### Refine Marketing Strategy:

Use the actionable insights provided by the system to optimize marketing campaigns based on ad spend efficiency and content performance.

## Future Enhancements

-   Integrate machine learning models for more accurate predictions of booking conversion likelihood.
-   Add additional filters and visualization options for enhanced data analysis.
-   Extend support to other ad platforms like Facebook Ads and Bing Ads for multi-channel marketing insights.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
