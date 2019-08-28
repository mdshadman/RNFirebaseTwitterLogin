package com.twitterlogin;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
private static final String TWITTER_KEY = "enter your own api key";
private static final String TWITTER_SECRET = "enter your own twitter app\'s secret key";
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "twitterlogin";
    }
}
