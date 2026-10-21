/** Guides for people who run a dining room. */

export const AUTHOR = {
  name: 'Servya team',
  note: 'Written by the Servya team at BuildNaya in Noida. We build Servya and write from setups with restaurants, cafes, bars, and hotel dining rooms. As of 2026, the product limits in these guides are the ones that are live.',
};

const kitchen = { to: '/blog/kitchen-order-board', label: 'kitchen order board' };
const qrGuide = { to: '/blog/how-qr-table-ordering-works', label: 'how QR table ordering works on a busy night' };
const menuGuide = { to: '/blog/change-your-menu-without-reprinting', label: 'change a restaurant menu without reprinting' };
const reportsGuide = { to: '/blog/close-the-night-with-clear-reports', label: 'close a restaurant night with reports' };
const venueGuide = { to: '/blog/qr-ordering-for-cafes-bars-and-hotels', label: 'QR ordering for cafes, bars, and hotels' };

export const POSTS = [
  {
    slug: 'qr-ordering-for-cafes-bars-and-hotels',
    title: 'QR Ordering for Cafes, Bars, and Hotels',
    description: 'See where QR ordering helps a cafe, a bar, and a hotel restaurant, and where a table code should stay out of the way, including room service.',
    excerpt: 'A second coffee, a reorder at a loud bar, and hotel breakfast are different jobs. Here is where a table code helps, and where it does not.',
    date: '2026-10-15',
    dateLabel: '15 October 2026',
    read: '7 min read',
    kicker: 'Venues',
    image: '/images/hospitality/hotel-breakfast.png',
    imageAlt: 'A hotel breakfast table set with coffee, juice, and plates in morning light',
    sections: [
      {
        paragraphs: [
          'It is 9:10 in a cafe. The queue reaches the door, and a guest at the window already has a seat. They want a second coffee and a slice of cake. Walking back to the counter means giving up the table.',
          'QR ordering lets a seated guest send an order from their phone by scanning a code at the table. The same idea shows up in a cafe, a bar, and a hotel restaurant, but the job is different in each room. This guide says where it helps, and where a table code should stay out of the way.',
        ],
      },
      {
        heading: 'Where QR ordering helps a cafe',
        paragraphs: [
          'In a cafe, the queue is the problem. A code on the table lets someone who is already sitting order again without rejoining the line. Keep the menu short. Mark an item sold out the moment the counter knows, because a cafe menu can go stale in an hour.',
          'Picture that window seat again. The guest scans, and the cake and the second coffee need to land in the same queue as the people standing at the counter. If phone orders sit in a separate list that nobody opens until the rush eases, the guest will still be waiting at 9:25. Name the table on the card in type a person can read. “Window” or “table 4” is enough. The person on the machine should be able to call it without asking the room where the order came from.',
          'The first order can still happen at the counter. Say that on the card. The code is for the people who are already sitting. The person pulling shots is still the person pulling shots.',
        ],
      },
      {
        heading: 'Where QR ordering helps a bar',
        paragraphs: [
          'At 10:30 the room is loud and a booth wants another round. Waving across the floor is slow, and a coaster with a code on it walks away with the guest.',
          'Put the code on the table or the booth. The bar should see its own tickets, with the table number, so a drink does not tour the kitchen first. If you also serve food, the kitchen and the bar both need that order. One shared pad will not do that once the room is full.',
          'A booth of four is a fair test. They scan, add two drinks and a plate of fries, and the bar should see the drinks while the kitchen sees the fries. If both land only on the kitchen screen, the bartender finds out when someone asks where the drinks are. Agree before the shift who fires what. Write the booth number on the card in type the runner can read from a step away. When the glasses come back, they should match the booth without a tour of the room.',
        ],
      },
      {
        heading: 'Where QR ordering helps a hotel dining room',
        paragraphs: [
          'A hotel restaurant works like any other dining room: guests at a table, a menu, a kitchen. A code on each table fits breakfast, all-day dining, and dinner. The guest in the breakfast room can reorder coffee without waiting for a server who is covering twelve tables.',
          'Breakfast is the sharp test. At 8:05 most tables want coffee, eggs, and the same few pastries. A code on each table lets a guest add juice while the server is on the far side of the room. The kitchen still needs the table number, because a room number and a table number are easy to mix if someone writes the order on a pad from memory. Keep the breakfast menu shorter than the dinner menu. When the pastry tray is empty, mark that item sold out before the next guest scans, or the phone will promise a croissant you no longer have.',
          [
            'The scan itself is the same loop described in ',
            qrGuide,
            '. Each table still needs its own code, or the kitchen will not know which seat ordered.',
          ],
        ],
      },
      {
        heading: 'Where a table code does not belong',
        paragraphs: [
          'Room service is a different job. A guest in a bedroom is not at a table you have numbered, and the order has to reach a different team. A code printed for table 12 cannot do that work. If a guest needs the room, they should still call.',
          'A code also will not fix a menu that changes every twenty minutes with no one assigned to mark items sold out. In a cafe, that person has to be on the counter during service. In a bar, it is whoever is firing drinks. In a hotel breakfast room, it is whoever can see the pastry tray.',
        ],
      },
      {
        heading: 'Who watches new orders',
        paragraphs: [
          'A code does not watch itself. Before the first service, name one person in each room who looks at new tickets.',
          'In the cafe, that is usually the person on the machine. Phone orders belong in the same queue as counter orders. If they wait in a list nobody opens, the guest at the window will sit there wondering where the cake went.',
          'In the bar, the bartender owns drink tickets and the kitchen owns food. Agree on that split before the room is loud. In the hotel dining room, the person running the service owns the board and calls the table number the same way they would call a written check.',
          'For the first week, that owner should be one person, not a rotation. Two people who each assume the other is watching will leave a ticket sitting until the guest asks. After the room trusts the screen, the habit can move with the shift.',
        ],
      },
      {
        heading: 'What to print on the card',
        paragraphs: [
          'The card has one job: get a seated guest to the right menu. It needs the code, the table or booth number in plain type, and one sentence about what scanning does.',
          'A clear sentence is “Scan to order from your phone, or ask us and we will take the order.” It tells the guest the phone path exists, and it tells them a person is still available. If the phone should only show the menu, say that instead. Do not leave the choice implied.',
          'Leave off slogans and a second code for wifi or feedback. A guest holding a glass needs one action. Three codes on one card means someone will scan the wrong one, and the kitchen will get a comment instead of an order. Replace a card when the corners curl or the code is stained. A code that fails twice teaches the table to ignore it.',
        ],
      },
      {
        heading: 'What to set up before the first service',
        steps: [
          'Print one code per table or booth, and put it where a seated guest can see it.',
          'Write one line on the card that says whether they can order from the phone, ask a person, or do both.',
          'Decide who marks items sold out, and check that the next guest stops seeing those items.',
          'Run one service in one area before you print codes for the rest of the room.',
        ],
      },
      {
        heading: 'How Servya handles these rooms',
        paragraphs: [
          'As of 2026, Servya is for venues where guests order from a table or a seat: restaurants, cafes, bars, lounges, and hotel dining rooms. Each table gets a QR code. Orders land on the kitchen board with the table number. A lounge seat and a breakfast table are both seats. A guest bedroom is not.',
          'If you are opening with one room, start there. Add the next room after one service has shown clean table numbers and a person who actually watches the tickets. Room service is not something we offer. If that is the part you need, tell us and we will say so plainly.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can a cafe keep the counter for the first order?',
        a: 'Yes. Many cafes take the first order at the counter and use the table code for a second coffee or a cake. Put that on the card so guests know both paths are real. The code is there for people who are already sitting.',
      },
      {
        q: 'Does a bar code replace the bartender?',
        a: 'No. It sends the reorder to the bar with a table number, so nobody has to wave across a loud room. Someone still makes the drink and still needs to see the ticket. If the bar and the kitchen both fire items, both need the order.',
      },
      {
        q: 'Is a hotel table code the same as room service?',
        a: 'No. A table code belongs in the dining room, at breakfast, or in the lounge. A guest in a bedroom is not at a numbered table. As of 2026, Servya does not offer room service. Those guests should still call.',
      },
    ],
  },
  {
    slug: 'how-qr-table-ordering-works',
    title: 'How QR Table Ordering Works on a Busy Night',
    description: 'See how restaurant QR table ordering works step by step, when it helps, when it does not, and how to test it on one section before rolling it out.',
    excerpt: 'A full Friday, a guest waiting at table 14, and the path from the scan to the kitchen. When QR table ordering helps, when it does not, and how to test it on one section first.',
    date: '2026-10-12',
    dateLabel: '12 October 2026',
    read: '6 min read',
    kicker: 'Service',
    image: '/images/hospitality/hero-steak.png',
    imageAlt: 'A seared steak on a dark plate in a dimly lit dining room',
    sections: [
      {
        paragraphs: [
          'It is 8:40 on a Friday. Every table is full, two servers are carrying trays past the bar, and a guest at table 14 has been trying to catch someone’s eye for five minutes. They want another glass of wine and a side of fries. They are not angry yet, but they are starting to wonder whether anyone knows they are there.',
          'QR table ordering lets a guest order from their phone by scanning a code at their table. This is the moment it is built for. The menu opens in the browser, and they order without waiting. The ticket reaches the kitchen with the table number already attached. Nobody has to memorize it, write it down, or shout it across the pass.',
          'Restaurant QR menus and QR ordering systems are now common, but many owners still ask the same question before trying them: what actually changes on the floor? This guide walks through the full process, the situations where it helps, the ones where it does not, and a simple way to test it on one night before you commit.',
        ],
      },
      {
        heading: 'How QR table ordering works, step by step',
        paragraphs: [
          'A guest sits down and opens the camera on their phone. They point it at the code on the table and tap the link that appears. The menu loads in the browser. There is no app to download, no account to create, and no password to remember.',
          'They choose their dishes, add notes if they need to, and send the order. The order appears on the kitchen display or ticket board, labeled with the table number. The kitchen starts cooking. The server knows the order exists and can see what is happening without relying on a handwritten slip.',
          'That is the whole loop. The real benefit is not the code itself. It is that the order no longer depends on someone noticing a raised hand, remembering the request, and walking it to the kitchen. Less of the work rests on memory, and more of it is recorded where the kitchen can see it.',
        ],
      },
      {
        heading: 'When QR ordering helps most',
        paragraphs: [
          'QR ordering earns its place on the nights when the room is full and the team is already stretched thin. A few situations come up again and again.',
          'Guests who already know what they want can order right away instead of waiting for a free server. This matters most at the start of a meal, when people are ready to order and the floor is at its busiest.',
          'Second rounds, desserts, and extra drinks become easier to add. Without a code, a guest often decides a drink is not worth flagging someone down for. With one, the request takes seconds, and the kitchen gets it as a clean, typed item.',
          'The kitchen also reads typed items more reliably than handwriting. Abbreviations, crossed-out modifiers, and smudged tickets cause mistakes on busy nights. A typed order with a clear table number removes a lot of that friction.',
          'The table number travels with the order. On a crowded floor, figuring out which seat ordered the risotto is a common source of delay. When the number is attached from the start, the plate goes to the right place.',
        ],
      },
      {
        heading: 'When QR ordering will not fix the problem',
        paragraphs: [
          'A QR code will not rescue a confusing menu with too many options and unclear descriptions. It will not solve a short-staffed kitchen, where tickets pile up no matter how they arrive. It will not replace a server in a room where guests expect personal attention for every course, such as a formal dinner or a tasting menu.',
          'Some restaurants should keep taking orders from a person and use the code only to display the menu. That is a sound setup. Put a short line on the table card explaining whether guests can order from the phone, ask a server, or do both, so nobody is left guessing.',
          'If your kitchen is already at capacity, a faster ordering channel sends more tickets into the same bottleneck. Fix the kitchen flow first, or at least understand it, before you expect QR ordering to make service faster.',
        ],
      },
      {
        heading: 'What to put on the table',
        paragraphs: [
          'Print one code per table, not one code for the whole room. A shared code is the most common mistake. It sends orders without a table number, and the kitchen ends up calling the floor to ask where the food should go.',
          'Place the card where a guest can see it without moving a glass or leaning across their companion. A small stand near the salt and pepper, or a card beside the napkin, works well. Make the QR code large enough to scan from a normal sitting distance, and include a short line of text, such as “Scan to view the menu and order from your phone, or ask your server for help.”',
          'That line tells guests they have a choice, and it makes sure both options are real. If the phone route works and a server is nowhere to be found, guests will feel misled, even if the system itself is working.',
        ],
      },
      {
        heading: 'A simple first night',
        paragraphs: [
          'You do not need to switch the whole restaurant at once. Pick one section of the room, or one service period, such as weekend dinners, and run the codes there first. Keep everything else the same so you can compare what changes.',
          'During that first night, watch three checks.',
        ],
        steps: [
          'Orders arrive with the correct table number every time.',
          'The kitchen can read the tickets without calling out to the floor.',
          'Guests who want a server can still get one quickly.',
        ],
      },
      {
        paragraphs: [
          'If any of those checks fail, fix the problem before printing cards for the rest of the room. Clearer menu descriptions, a different card placement, or a change in how the kitchen displays tickets are easier to handle in one section than across the whole restaurant.',
        ],
      },
      {
        heading: 'How Servya handles QR table ordering',
        paragraphs: [
          [
            'In Servya, each table has its own QR code, so every order arrives tagged with the correct table number from the moment it is sent. Guests open the menu in their browser and place the order directly. The order then appears on the ',
            kitchen,
            ' with that table’s number.',
          ],
          [
            'Setting up the menu does not have to be a long project. You can import dishes from an Excel file or add them one at a time. The guide to ',
            { to: menuGuide.to, label: 'changing a menu without reprinting' },
            ' covers sold-out dishes and the weekly check. Guests still settle the bill the way they do today. Paying inside the menu is not available yet, so checkout stays with your staff.',
          ],
          [
            'That limit is worth knowing before you start. QR ordering covers the part of the meal where the guest is choosing and the kitchen is cooking. If your room is a cafe, a bar, or a hotel dining room, read ',
            venueGuide,
            ' before you print codes for every seat.',
          ],
        ],
      },
    ],
    faq: [
      {
        q: 'Do guests need an app for QR table ordering?',
        a: 'No. They open the phone camera, scan the code, and the menu loads in the browser. There is no download and no account. As of 2026, that is how a guest orders in Servya.',
      },
      {
        q: 'Should one QR code cover the whole restaurant?',
        a: 'No. A shared code does not tell the kitchen which table ordered. Print one code per table so the ticket arrives with the table number already on it. Test that on one section before you print the rest.',
      },
      {
        q: 'Can guests pay from the QR menu?',
        a: 'Not in Servya, as of 2026. Guests still pay with your staff, the way they do today. Judge QR table ordering on whether ordering gets smoother on a busy night, not on whether it replaces the bill.',
      },
    ],
  },
  {
    slug: 'close-the-night-with-clear-reports',
    title: 'How to Close a Restaurant Night with Reports',
    description: 'A ten-minute way to close a restaurant night: what sold, what to prep tomorrow, and which sales numbers are worth reading before you lock the door.',
    excerpt: 'The useful report is the one you can read before the team leaves. Here is a short close that tells you what to prep tomorrow.',
    date: '2026-10-08',
    dateLabel: '8 October 2026',
    read: '6 min read',
    kicker: 'Reports',
    image: '/images/hospitality/bar-cocktail.png',
    imageAlt: 'A bartender pouring an amber cocktail in front of a lit back bar',
    sections: [
      {
        paragraphs: [
          'It is 11:05. The last table has paid, the pass is wiped, and someone is about to export a spreadsheet they will open tomorrow morning. By then the special that died at 8:30 is a guess.',
          'To close a restaurant night, read a short record of what sold, when it sold, and what guests said, before anyone leaves. You need those facts, not a wall of charts. If you cannot get them without waiting until morning, the report is for someone else.',
        ],
      },
      {
        heading: 'What to check before anyone leaves',
        paragraphs: [
          'One person looks at the night in this order. Ten minutes is enough when the numbers are already on one screen.',
        ],
        steps: [
          'Dishes that sold out, and whether that was a good problem or a prep miss.',
          'Dishes that did not sell, so tomorrow’s prep can shrink.',
          'The busy hour, so next week’s roster matches the room.',
          'Anything the kitchen sent back or the floor had to apologise for. Write the table down while you still remember it.',
        ],
      },
      {
        paragraphs: [
          'That is enough to change tomorrow. A monthly spreadsheet is for trends. The nightly look is for the next service.',
        ],
      },
      {
        heading: 'Which restaurant reports to skip',
        paragraphs: [
          'If nobody changes prep, staffing, or the menu because of a number, stop producing it. A short report people read beats a long one nobody opens.',
          'Skip any chart you cannot explain in one sentence to the person who preps tomorrow. If the sentence is “it looks busy,” you already knew that at 8:40. Cover counts with no time on them have the same problem. You felt the rush. The number only helps if it tells you whether the rush was 7:30 or 9:15, because those two hours need different prep and a different roster.',
        ],
      },
      {
        heading: 'One Friday, written out',
        paragraphs: [
          'Say the room did 64 covers. The 7:30 seating was full. The 9:15 seating was half empty. The pasta special, planned for 20 portions, was gone by 8:20. The chocolate dessert moved four plates. Two tables said the mains were slow.',
          'That is a useful close. Tomorrow you can prep more pasta if the kitchen can actually fire it, because 20 portions was a miss. You do not automatically prep the same number of desserts. You look at whether the 9:15 seating needs a smaller team next Friday, or whether the kitchen was late and the room emptied for that reason.',
          'The two slow-main comments belong next to the tickets from those tables. If both tickets hit the board at 8:05 and left at 8:40, the comment matches a long wait. If you cannot see the times, the comment is only a mood. Write four lines before anyone leaves: what sold out, what did not sell, which hour was busy, and what went wrong. A longer export can wait until the next morning.',
        ],
      },
      {
        heading: 'Who should read the close',
        paragraphs: [
          'The person who changes tomorrow’s prep should be the one who reads the close. In a small room that is often the owner, or the chef who writes the list. A manager who only forwards a screenshot has not closed the night.',
          'Read it at the pass or in the dining room, with the board still open, while the tables are fresh. Ten minutes at 11:05 beats a careful look at 10 the next morning. By morning you will have invented a reason the pasta ran out.',
          'The kitchen does not need a sales chart during service. They need the four lines for the prep list. If the chef is still breaking down the pass, the owner can write the note and leave it where the morning team will see it.',
        ],
      },
      {
        heading: 'What the screen will miss',
        paragraphs: [
          'The screen will miss things the team still knows. A dish sent back because it was cold. A table that waited and never left a comment. A garnish the kitchen ran out of after someone said so out loud and nobody marked the menu.',
          'Keep a card by the pass for those. One line each: table, time, what happened. Put it with the close. If the card is blank on a busy Friday, ask one question before you trust the blank. Did nothing go wrong, or did nobody write it down?',
          'Do not start a second spreadsheet for that card. Four lines on paper, plus the screen, is enough to change tomorrow. More than that and the close becomes the thing people skip.',
        ],
      },
      {
        heading: 'Where guest comments belong',
        paragraphs: [
          'A comment that says the pasta was late means more when you can see what else that table ordered and when the ticket hit the kitchen. Keep feedback with the night it came from. A folder of comments with no date is just mood.',
          [
            'The comment is only useful if you can see the ticket. That is why the ',
            kitchen,
            ' and the nightly report need to describe the same orders.',
          ],
        ],
      },
      {
        heading: 'How Servya shows the close',
        paragraphs: [
          'As of 2026, Servya’s reports fill in as service runs, so you can see what sold without rebuilding a spreadsheet after close. Guest feedback sits alongside orders. Owners and managers see the reports. The kitchen stays on the board.',
          'Use the screen for the four lines, then stop. What sold out, what barely moved, which hour was full, and which tables had a problem. If a number on the dashboard does not change prep, the roster, or the menu, leave it for another day. The point of the close is the next service, not a fuller chart.',
          'A report still will not change tomorrow if nobody looks at it before they leave. The ten-minute close is the habit. The screen only makes the facts available.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do I need a full dashboard to close the night?',
        a: 'No. You need what sold, what did not, which hour was busy, and what went wrong. A dashboard that takes until morning to export misses the point. Read those four things before the team leaves.',
      },
      {
        q: 'How long should the close take?',
        a: 'About ten minutes if one person owns it and the numbers are already on screen. Longer usually means the report is asking for facts you will not use tomorrow.',
      },
      {
        q: 'Should the kitchen read the sales report?',
        a: 'The kitchen needs the live tickets during service. Owners and managers read the close. If a dish was sent back, write the table down so the report and the pass describe the same night.',
      },
    ],
  },
  {
    slug: 'change-your-menu-without-reprinting',
    title: 'Change a Restaurant Menu Without Reprinting',
    description: 'How to change a restaurant menu without reprinting: sold-out dishes, price updates, and a ten-minute weekly check before your busiest service.',
    excerpt: 'A sold-out special should not mean a walk to the printer. Here is how to keep the menu guests see in step with the kitchen.',
    date: '2026-10-05',
    dateLabel: '5 October 2026',
    read: '6 min read',
    kicker: 'Menu',
    image: '/images/hospitality/dessert-gold.png',
    imageAlt: 'A plated dessert with gold leaf on a dark restaurant table',
    sections: [
      {
        paragraphs: [
          'It is 8:15. The Friday special has sold out, and the card on table 6 still lists it. The guest orders it. The kitchen says no. The reprint was never the expensive part. The apology is.',
          'A live menu is the menu on the guest’s phone, which you can update during service without printing new cards. Changing a restaurant menu without reprinting means the next person who scans sees the dishes you can still make, at the prices you actually charge.',
        ],
      },
      {
        heading: 'What belongs on a live restaurant menu',
        paragraphs: [
          'Keep it short enough that someone can update it during service without calling a meeting.',
        ],
        list: [
          'Name, price, and a short description a guest can understand.',
          'A way to mark an item sold out, and to bring it back the next day.',
          'Categories that match how you sell: small plates, mains, drinks, dessert.',
          'Only the changes the kitchen will actually make.',
        ],
      },
      {
        heading: 'What to leave off the menu',
        paragraphs: [
          'Do not list a dish the kitchen has not cooked yet. A menu on a phone is still a promise. If you are testing a special, run it for one service with the floor taking that order, and add it once the pass can fire it without a conversation.',
          'Leave off modifiers the kitchen will refuse on a Saturday. If “no onion, extra sauce, on the side” is not real for that dish, do not show it. A guest who can tap it will tap it, and the pass will spend the night saying no.',
        ],
      },
      {
        heading: 'How to write a line a guest can order from',
        paragraphs: [
          'A description has one job: help someone decide without calling a server over to translate it. Name the main thing on the plate, the one flavour they will notice, and anything they must know before they order, such as nuts or a long cook time.',
          '“Pasta, chilli, lemon, 15 minutes” is enough. “A celebration of seasonal produce on a journey of texture” tells the guest nothing they can use at 8:15. If the dish takes longer than the rest of the menu, say so. A guest who orders it beside two quick plates will think the kitchen forgot them.',
          'Read the line out loud once. If you stumble, the guest will too. Keep prices next to the name, not in a separate column they have to hunt for on a phone. And if the kitchen uses a different name from the one on the menu, pick one. Two names for the same dish is how a ticket comes back as “which pasta?”',
        ],
      },
      {
        heading: 'Mark a dish sold out during service',
        paragraphs: [
          'When the last portion is plated, the menu should change before the next scan. The order of that moment matters.',
        ],
        steps: [
          'The pass says the item is gone, out loud, to one person who can edit the menu.',
          'That person marks it sold out. The next guest who opens the menu no longer sees it as available.',
          'The floor hears the same news, so a server does not offer it from memory.',
          'The next morning, someone either brings it back or removes it before the weekly check.',
        ],
      },
      {
        paragraphs: [
          'If step two waits until after service, every table that scans in the meantime can order a dish you cannot make. That is the apology from the opening, repeated. In a cafe this can happen within the hour. In a dining room it usually happens once, hard, around the time the special runs out.',
        ],
      },
      {
        heading: 'The paper menu you still keep',
        paragraphs: [
          'Some rooms will keep a printed menu for guests who do not want to use a phone. That card can stay. It just cannot be the only place a price lives.',
          'If the paper says one price and the phone says another, the guest will trust whichever is lower, and the team will have an argument at the bill. Pick the phone as the price you charge, and reprint the paper only when you are ready for both to match. Until then, a short line on the paper can say the phone menu is the current one.',
          'You still do not reprint a QR code when a price changes. The code only opens the menu. Reprint a card when the table number changes or the code is too worn to scan. The weekly check is there so the phone, the paper, and the prep list are talking about the same dishes.',
        ],
      },
      {
        heading: 'A weekly menu check',
        paragraphs: [
          'Once a week, before your busiest service, one person checks three things. Ten minutes here saves a night of “sorry, that’s finished.”',
        ],
        steps: [
          'Prices on the phone match what you charge.',
          'Last week’s sold-out items are either back or gone.',
          'The specials are the ones you are actually prepping.',
        ],
      },
      {
        paragraphs: [
          'If the menu already lives in a spreadsheet, start there. Upload it, then fix names and categories on screen. Typing two hundred dishes by hand is how menus stay out of date, because nobody wants to do it twice. After the upload, open the menu on your own phone and order one dish as a guest would. If the price, the name, or the category looks wrong there, it will look wrong on table 6.',
        ],
      },
      {
        heading: 'How Servya updates the menu',
        paragraphs: [
          [
            'As of 2026, Servya lets you upload a menu as an Excel sheet or add items one at a time. You can edit dishes, prices, and categories when you need to. The next guest who scans the table sees the menu you just saved. You do not reprint a QR code when a price changes. The code stays on the table. The menu behind it changes. The ',
            qrGuide,
            ' explains why that code still has to be one per table.',
          ],
        ],
      },
    ],
    faq: [
      {
        q: 'Do I reprint QR codes when a price changes?',
        a: 'No. The code on the table only opens the menu. Change the price on the live menu and the next guest sees it. Reprint a code only when the table itself changes, or the printed card is damaged.',
      },
      {
        q: 'When should I mark a dish sold out?',
        a: 'As soon as the kitchen or the counter knows it is gone. A guest who orders it after that gets an apology. In a cafe this can happen within the hour. In a dining room it often happens mid-service.',
      },
      {
        q: 'Can I add a special during service?',
        a: 'Only if the kitchen can fire it without a meeting. Otherwise take that order with a server for one service, then add it to the phone menu once the pass is comfortable.',
      },
    ],
  },
  {
    slug: 'kitchen-order-board',
    title: 'How a Kitchen Order Board Stops Lost Tickets',
    description: 'How a kitchen order board shows the table, the items, and what to fire next, so Saturday service stops depending on paper dockets.',
    excerpt: 'If the pass is a pile of paper, the board is the fix. Here is how to run one screen so the kitchen knows what is next.',
    date: '2026-09-28',
    dateLabel: '28 September 2026',
    read: '6 min read',
    kicker: 'Kitchen',
    image: '/images/hospitality/kitchen-pass.png',
    imageAlt: 'Plates waiting at a restaurant kitchen pass under warm light',
    sections: [
      {
        paragraphs: [
          'It is Saturday, 8:50. A docket has slid under a plate, and the person on the pass is asking which table the pasta was for. The food is ready. The table is not.',
          'A kitchen order board is one screen that lists each order with its table number and items, in the order they came in. It exists so that question does not have to be shouted. On a quiet Tuesday a handwritten docket is fine. On a Saturday, paper slides, gets splashed, and gets called out of order.',
        ],
      },
      {
        heading: 'What a kitchen order board must show',
        paragraphs: [
          'A chef should be able to answer four questions without leaving the screen. If the board hides any of them, the team will go back to shouting.',
        ],
        list: [
          'Which order came in first?',
          'Which table is it for?',
          'What is still to fire, and what is already done?',
          'What changed after the order was sent?',
        ],
      },
      {
        heading: 'Where to put the kitchen screen',
        paragraphs: [
          'One screen at the pass is enough for most single dining rooms. A tablet on a stand, a laptop, or a monitor on the wall all work, as long as the browser stays open and the screen does not sleep. Put it where the person calling the pass can see it without turning their back on the plates.',
          'If the bar fires its own drinks, give the bar its own view. Do not make the kitchen read cocktail tickets.',
        ],
      },
      {
        heading: 'The habit that keeps tickets from getting lost',
        paragraphs: [
          'Agree on one status language before service. When a dish leaves the pass, someone marks it. For the first week, one person owns the board. After that it belongs to the pass, the same way wiping it down does.',
        ],
        steps: [
          'New: the order has arrived and nobody has started it.',
          'In progress: the kitchen is firing it.',
          'Ready: it is on the pass, waiting to go to the table.',
          'Done: it has left the pass, and the ticket is no longer in the way.',
        ],
      },
      {
        paragraphs: [
          'Count the times someone still writes an order on paper “just in case.” Each of those is a hole: a modifier the board did not show, a table the floor did not trust, or a screen that was hard to see. Fix the hole. A second paper system gives you two versions of the night by 9pm.',
        ],
      },
      {
        heading: 'One ticket on a Saturday',
        paragraphs: [
          'Table 9 scans at 8:41. Two pastas, one steak, no onion on one pasta, and a note that the steak is for the birthday. The board should show table 9 at the top of the new tickets, with those items in the order the guest sent them.',
          'The person on the pass reads it once and starts the pastas. They mark the ticket in progress so the next chef does not start it again. When the pastas are up, they mark those items ready. The steak stays in progress. A runner can see that split without asking. If the board only has one status for the whole ticket, the pastas sit while everyone waits for the steak, or the steak gets forgotten because the ticket already looks done.',
          'At 8:50 the old failure mode was a docket under a plate and a shouted question. The same night on a board fails in a quieter way: nobody marks the pastas ready, so the runner does not know they are up. The status habit is what stops that. The screen only lists the work.',
        ],
      },
      {
        heading: 'When the guest changes the order',
        paragraphs: [
          'A change after the ticket is sent is where paper and a board both go wrong, unless the change is visible. The guest at table 9 realises the birthday steak should be medium, not the default. Someone has to get that onto the ticket the kitchen is already firing.',
          'If the floor walks over and says it, the person on the pass must put it on the same ticket, not on a new slip. A second ticket for “medium” with no table, or a second ticket that looks like a new steak, is how you cook two. If the guest can send the change from the phone, it still needs to land on the open ticket, with the table number, where the chef is already looking.',
          'Treat a cancellation the same way. A dish that has not been fired can come off. A dish that is already on the plate needs a person to stop it, not a silent edit the pass will never see. Say who is allowed to change a live ticket before service, and stick to that person on the first weekend.',
        ],
      },
      {
        heading: 'If the screen sleeps or the wifi drops',
        paragraphs: [
          'A dark screen is a closed pass. Set the tablet or monitor so it does not sleep during service, and charge it before the shift, not at 8:30. Put the charger where the pass can reach it without leaving the plates.',
          'If the wifi drops, the kitchen should keep firing what is already on the screen and tell the floor to pause new phone orders until it is back. Taking new orders on paper “just for ten minutes” is how you end the night with two lists. Write the time the screen failed, and the time it came back, on the pass card. That note belongs with the close, because a slow hour may have been a dead screen and not a quiet room.',
          'One spare screen in a drawer is worth more than a speech about backup. Any tablet or laptop with a browser can open the same board. You do not need a second kind of hardware.',
        ],
      },
      {
        heading: 'How Servya runs the kitchen board',
        paragraphs: [
          [
            'As of 2026, Servya’s kitchen board is a screen your chefs keep open. Each order shows the table number and the items. Chefs see the board. Owners and managers see menus, tables, staff, and reports. You do not need a special kitchen printer. Any tablet, laptop, or monitor with a current browser is enough. Orders reach that screen from the table, which is the loop in ',
            qrGuide,
            '.',
          ],
          [
            'After service, the same orders are what you read when you ',
            reportsGuide,
            '. If the board and the close describe different tickets, one of them was marked late.',
          ],
        ],
      },
    ],
    faq: [
      {
        q: 'What is a kitchen order board?',
        a: 'It is one screen at the pass that lists orders with the table number and the items, in the order they arrived. Chefs use it instead of chasing paper dockets. The screen can be a tablet, a laptop, or a monitor.',
      },
      {
        q: 'Do I need special kitchen hardware?',
        a: 'No. As of 2026, Servya runs in a browser. Keep the screen awake and where the person calling the pass can see it. A printer you can only buy from a vendor is not required.',
      },
      {
        q: 'Why do tickets still get lost after we add a screen?',
        a: 'Usually two people are marking tickets whenever they remember, or the floor is still writing a second copy on paper. Pick one status language, give one person the board for the first week, and stop the paper copy once the screen shows the modifier and the table.',
      },
    ],
  },
  {
    slug: 'what-to-ask-before-buying-restaurant-software',
    title: 'What to Ask Before Buying Restaurant Software',
    description: 'Questions to ask before buying restaurant software: the guest menu, the kitchen screen, sold-out dishes, hardware, price, and what is not live yet.',
    excerpt: 'Most restaurant software looks finished in a demo. These are the questions that tell you whether it will survive a Friday.',
    date: '2026-09-18',
    dateLabel: '18 September 2026',
    read: '6 min read',
    kicker: 'Owners',
    image: '/images/hospitality/rooftop.png',
    imageAlt: 'A rooftop lounge table at dusk with a cocktail and small plates',
    sections: [
      {
        paragraphs: [
          'The demo cafe on the screen has twelve dishes and no Friday rush. Your menu has the special that sells out, two modifiers the kitchen hates, and a pass that is already loud at 8:30.',
          'Restaurant software, for a single dining room, is the system that takes the order, shows it to the kitchen, and tells you what sold. Buying restaurant software should start from one real Friday, not from a sample menu. Write down who takes the order, who fires it, who closes the bill, and who counts the money. The product should shorten that path.',
        ],
      },
      {
        heading: 'Questions to ask before you buy',
        paragraphs: [
          'Ask these with your own menu open.',
        ],
        list: [
          'Can a guest open the menu without downloading an app?',
          'Does each table have its own code, so the kitchen knows where the food goes?',
          'What does the kitchen see, on one screen, when ten orders arrive in two minutes?',
          'Can I mark a dish sold out during service, and does the next guest stop seeing it?',
          'Who on my team can change prices, and who can only see the kitchen?',
          'What do I see at the end of the night without exporting a spreadsheet?',
          'What does it not do yet?',
        ],
      },
      {
        paragraphs: [
          'The last question matters. A straight answer is a better sign than a long roadmap. If the product needs you to change how the room runs before it works, you are buying a new operation.',
        ],
      },
      {
        heading: 'What you need on day one',
        paragraphs: [
          'For a single dining room, day one is small: a menu, tables, a way for orders to reach the kitchen, and a way to see what sold. Staff logins matter as soon as more than one person is on the system. Loyalty apps, delivery marketplaces, and a second venue can wait until the first room is calm.',
          'You should not need a printer or a terminal you can only buy from the vendor. A screen in the kitchen and printed codes on the tables are enough to start. If the quote depends on a box you have never used, ask what happens when that box fails on a Saturday.',
          'Ask what you pay this month, what happens if you get busier, and whether there is a setup fee. If the answer needs a slide, ask again.',
        ],
      },
      {
        heading: 'Run the demo on your own Friday',
        paragraphs: [
          'Send the menu ahead of the call, or share your screen and open the sheet you already use. Ask them to add one sold-out dish, one price change, and one modifier the kitchen will not do. Then ask them to show the ticket that reaches the kitchen, with a table number on it.',
          'A sample cafe with twelve dishes will look calm. Your Friday will not. If they cannot load your dishes, ask how long that work takes and who does it. If the answer is a project team and two weeks, that is part of the price, even when the monthly fee looks small.',
          'Time the boring parts. How many taps to mark an item sold out. Whether the kitchen screen shows ten tickets at once without scrolling past the table number. Whether a chef account can change a price. You are watching a Friday, not a tour.',
        ],
      },
      {
        heading: 'A card to fill in during the call',
        paragraphs: [
          'Write the answers down while they talk. A demo is easy to remember as better than it was.',
        ],
        list: [
          'Guest path: app, or browser. Account required, or not.',
          'One code per table, or one code for the room.',
          'What the kitchen sees when ten orders arrive together.',
          'Who can change a price, and who can only see tickets.',
          'What the close shows before anyone leaves.',
          'What is not live yet, in their words.',
          'What you pay this month, and what a busier month costs.',
          'What happens on a Saturday if their hardware fails.',
        ],
      },
      {
        paragraphs: [
          'If a line stays blank, that is an answer too. Ask it again before you hang up. A blank “what is not live yet” usually means the roadmap was long and the limit was never named.',
        ],
      },
      {
        heading: 'What to ignore in the pitch',
        paragraphs: [
          'Ignore a feature you will not use in the next month. Loyalty points, a second brand, and a marketplace integration do not shorten Friday. They can wait until the first room is calm.',
          'Ignore a case study that does not name the kind of room. A food court and a 40-seat dining room do not fail in the same places. Ask what the team still does by hand after six months. That leftover work is the real product.',
          'Ignore urgency. A price that expires tonight is a reason to slow down, not a reason to skip the card. You can buy next week. You cannot easily unpick a system the floor has stopped trusting.',
        ],
      },
      {
        heading: 'How Servya answers these questions',
        paragraphs: [
          [
            'As of 2026, Servya is built for one dining room at a time: restaurants, cafes, bars, and hotel restaurants. Guests scan a table QR code and order in the browser. The kitchen reads one board. Owners manage the menu, tables, staff roles, and reports. There is no special hardware. ',
            qrGuide,
            ' and the ',
            kitchen,
            ' describe those two screens in more detail.',
          ],
          [
            'Online payment inside Servya is not available yet. Guests settle the bill the way they already do. Room service is not something we offer. If you run more than one venue, we will tell you what is covered today. Plans and a walkthrough of your own menu are on the ',
            { to: '/pricing', label: 'pricing page' },
            ' and the ',
            { to: '/contact', label: 'demo request' },
            '.',
          ],
        ],
      },
    ],
    faq: [
      {
        q: 'What should restaurant software do on the first night?',
        a: 'Take the order, show it to the kitchen with the table number, and tell you what sold. Staff logins matter once more than one person uses it. Loyalty schemes and a second venue can wait.',
      },
      {
        q: 'Do I need special hardware?',
        a: 'A kitchen screen and printed table codes are enough to start. As of 2026, Servya runs in a browser on a tablet, laptop, or monitor. Ask any vendor what happens if their box fails on a Saturday.',
      },
      {
        q: 'What if the product cannot take payment yet?',
        a: 'Ask them to say so. Servya does not take payment inside the menu as of 2026. Guests pay with your staff. That is a limit, and it should be clear before you print codes.',
      },
    ],
  },
];

export function getPost(slug) {
  return POSTS.find((post) => post.slug === slug);
}

export function relatedPosts(slug, count = 2) {
  return POSTS.filter((post) => post.slug !== slug).slice(0, count);
}
