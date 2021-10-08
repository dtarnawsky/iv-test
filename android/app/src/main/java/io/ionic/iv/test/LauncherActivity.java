package io.ionic.iv.test;
import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class LauncherActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if(isTaskRoot()) {
            Intent i = new Intent(this, MainActivity.class);
            startActivity(i);
        }
        finish();
    }

    @Override
    protected void onNewIntent(Intent intent) {
      super.onNewIntent(intent);
      Intent i = new Intent(this, MainActivity.class);
      startActivity(i);

//      Intent newIntent = new Intent(intent);
//      newIntent.setClass(getApplicationContext(), MainActivity.class);
//      startActivity(newIntent);
    }
}
