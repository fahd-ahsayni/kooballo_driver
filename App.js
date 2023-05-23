import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase as supabaseDriver } from "./supabase/driver";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "./config/store";
import Account from "./screens/auth/Account";
import Auth from "./screens/auth/Auth";

import "react-native-reanimated";
import "react-native-gesture-handler";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabaseDriver.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseDriver.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        {session && session.user ? (
          <Account key={session.user.id} session={session} />
        ) : (
          <Auth session={session} />
        )}
      </NativeBaseProvider>
    </Provider>
  );
}
