import { useEffect, useState } from "react";

export type AirportSchedule = {
  code: string;
  number: string;
  airline: string;
  direction: string;
  city: string;
  scheduled: string;
  estimated: string | null;
  status: string;
  flightIcao: string;
};

export default function useGetAirportData() {
  const [data, setData] = useState<AirportSchedule[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const stored = localStorage.getItem("airportData");
      if (!stored || Date.now() > JSON.parse(stored).expiry) {
        try {
          const response = await fetch(
            "https://getairportdata-5tblqleuba-uc.a.run.app/",
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setData(result);
          localStorage.setItem(
            "airportData",
            JSON.stringify({
              value: result,
              expiry: Date.now() + 45 * 60 * 1000,
            }),
          );
        } catch (err) {
          setError(err as Error);
        } finally {
          setIsLoading(false);
        }
      } else {
        const localData = localStorage.getItem("airportData");
        if (localData) {
          setData(JSON.parse(localData).value);
        }
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, error };
}
