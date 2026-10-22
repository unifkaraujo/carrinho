import 'expo-router/entry';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { widgetTaskHandler } from './src/features/quick-capture/widget/widget-task-handler';

registerWidgetTaskHandler(widgetTaskHandler);
