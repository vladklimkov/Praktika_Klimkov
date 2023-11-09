const WebSocket = require('ws');

const keywords = {
'vegetable': ['https://www.shutterstock.com/shutterstock/photos/226285939/display_1500/stock-photo-potatoes-in-a-box-on-a-rustic-wooden-table-226285939.jpg', 
  'https://www.shutterstock.com/shutterstock/photos/2268084035/display_1500/stock-photo-carrot-in-the-hand-big-bunch-of-carrots-in-a-female-hand-on-a-background-of-the-garden-2268084035.jpg', 
  'https://www.shutterstock.com/shutterstock/photos/2218276989/display_1500/stock-photo-corn-cobs-in-corn-plantation-field-2218276989.jpg'],
'fruit': ['https://www.shutterstock.com/shutterstock/photos/1798373137/display_1500/stock-photo-autumn-day-rural-garden-in-the-frame-ripe-red-apples-on-a-tree-it-s-raining-photographed-in-1798373137.jpg', 
  'https://www.shutterstock.com/shutterstock/photos/1297537468/display_1500/stock-photo-bunch-of-bananas-isolated-on-white-background-bananas-with-leaves-clipping-path-professional-food-1297537468.jpg', 
  'https://www.shutterstock.com/shutterstock/photos/593811710/display_1500/stock-photo-orange-garden-593811710.jpg'],
'nut': ['https://www.shutterstock.com/shutterstock/photos/1927455377/display_1500/stock-photo-walnut-with-leaf-isolate-walnuts-peeled-and-unpeeled-with-leaves-on-white-walnut-nut-side-view-1927455377.jpg', 
  'https://www.shutterstock.com/shutterstock/photos/1707279526/display_1500/stock-photo-full-and-halfs-of-hazelnuts-on-white-background-isolated-1707279526.jpg', 
  'https://www.shutterstock.com/shutterstock/photos/1239793840/display_1500/stock-photo-roasted-cashew-nuts-with-green-leaves-isolated-on-white-background-macro-studio-shot-1239793840.jpg']
};

let MaxThreadCount = 8; 
const server = new WebSocket.Server({ port: 5020 });
console.log("Сервер запущен. Порт 5020");

server.on('connection', (socket) => 
{
  console.log("Пользователь подключился");
  let threadCount = 0; 

  socket.on('message', (keyword) => 
  {
    console.log(`Получено ключевое слово: ${keyword}`);
    const urls = keywords[keyword];
    if (threadCount < MaxThreadCount) 
    {
      threadCount++;

      if (urls) 
      {
        socket.send(JSON.stringify(urls));
      } 
      else 
      {
        socket.send(JSON.stringify(new String('empty')));
      }

      console.log("Запуск потока");
    }
    else 
    {
      console.log('Занято максимальное количество потоков');
    }
  });

  socket.on('close', () => 
  {
    console.log('Пользователь отключился');
  });
});