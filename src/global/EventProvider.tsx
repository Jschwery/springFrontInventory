import { createContext, useState, useContext } from "react";

const EventContext = createContext<[any, any] | null>(null);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentEvents, setCurrentEvents] = useState([]);

  return (
    <EventContext.Provider value={[currentEvents, setCurrentEvents]}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }

  return context;
};
