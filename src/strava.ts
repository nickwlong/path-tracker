import axios, { AxiosResponse, isAxiosError } from 'axios';
import * as dotenv from 'dotenv';
import { stringify } from 'querystring';

// 1: Go to https://www.strava.com/oauth/authorize?client_id=95833&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all and click authorise various rights. to add more permissions, update the scope param!
// 2: Once authorised, take the param 'code' from this and pass it in a request with client_id and client_secret to:
// https://www.strava.com/api/v3/oauth/token?client_id=REDACTED&client_secret=REDACTED&code=REDACTED&grant_type=authorization_code
// 3: This returns a refresh token and access token. The refresh token expires after 6 hours. To get a new one, make a request to here:
// `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${process.env.STRAVA_REFRESH_TOKEN}`;
// If the refresh token expires soon or has expired, a new one is returned.

// Specify the filename when calling config()
dotenv.config({ path: '.env.local' });

const getAccessToken = async () => {
  try {
    const url = `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${process.env.STRAVA_REFRESH_TOKEN}`;
    const response: AxiosResponse = await axios.post(url);
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};

const getActivities = async () => {
  try {
    const config = {
      method: 'get',
      url: 'https://www.strava.com/api/v3/athlete/activities',
      headers: {
        Authorization: `Bearer ${process.env.STRAVA_ACCESS_TOKEN}`,
      },
    };

    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
    }
  }
};

const getDistances = async () => {
  const result = await getActivities();
  const runActivities = result.filter(
    (activity: Record<any, any>) =>
      activity.type === 'VirtualRun' || activity.type === 'Run'
  );
  const distances = runActivities.map(
    (activity: Record<any, any>) => activity.distance
  );
  const totalDistance = distances.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue
  );
  console.log(totalDistance);
};

getDistances();
