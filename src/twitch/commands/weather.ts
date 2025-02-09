import { ChatClient } from "@twurple/chat";

import { config } from "../../config/env";

export async function weatherCommand({
  user,
  chatClient,
  channel,
}: {
  user: string;
  chatClient: ChatClient;
  channel: string;
}) {
  try {
    const weatherData = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${config.WEATHER_API_KEY}&q=-34.0757,18.8433`
    );

    const weatherDataJson = await weatherData.json();

    // @ts-expect-error
    const dayOrNight = weatherDataJson.current.is_day === 1 ? "day" : "night";
    // @ts-expect-error
    let conditionText = weatherDataJson.current.condition.text.toLowerCase();

    // Change 'sunny' to 'clear' during nighttime
    if (conditionText === "sunny" && dayOrNight === "night") {
      conditionText = "clear";
    }

    return chatClient.say(
      channel,
      `@${user} it is a ${conditionText} ${dayOrNight} in Somerset West, South Africa where Barry lives. The temperature is ${
        // @ts-expect-error
        weatherDataJson.current.temp_c
      }°C (or ${
        // @ts-expect-error
        weatherDataJson.current.temp_f
      }°F if you're into Freedom Units).`
    );
  } catch (e) {
    return chatClient.say(
      channel,
      `@${user} I have no idea wtf the weather is right now...`
    );
  }
}
