/* English <-> Mongolian (Монгол) for the Family Gift Exchange.
   The app is written in English; every piece of visible text goes through GXI.T().
   Unknown strings (names, wishlist items typed by people) pass through untouched. */
(function(){
  var KEY = "giftx.lang", lang = "en", listeners = [];
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "mn" || saved === "en") lang = saved;
    else if (/^mn\b/i.test((navigator.languages && navigator.languages[0]) || navigator.language || "")) lang = "mn";
  } catch(e){}

  // keys are written in plain form: straight quotes, no emoji variation selectors
  function norm(s){ return String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/️/g, ""); }

  var RAW = {
    // ---- general / top bar ----
    "Christmas 2026": "Зул сарын баяр 2026",
    "Family Gift Exchange": "Гэр бүлийн бэлэг солилцоо",
    "Replay welcome": "Угтах дэлгэцийг дахин үзэх",
    "Remove snowman": "Цасан хүнийг арилгах",
    "Summon snowman": "Цасан хүнийг дуудах",
    "Switch between light view and night view": "Өдөр, шөнийн горимыг солих",
    "Light": "Өдөр",
    "Night": "Шөнө",
    "Sign out": "Гарах",
    "Language": "Хэл",
    "Close": "Хаах",
    "You": "Та",
    "Joined": "Нэгдсэн",
    "Not yet": "Хараахан үгүй",
    "Cancel": "Болих",
    "Confirm": "Батлах",
    "Remove": "Хасах",
    "Other": "Бусад",
    "Family": "Гэр бүл",
    "Name": "Нэр",
    "Email": "Имэйл",
    "Password": "Нууц үг",
    // ---- tabs ----
    "Home": "Нүүр",
    "My match": "Миний хүн",
    "My profile": "Миний профайл",
    "Sign in": "Нэвтрэх",
    "Create profile": "Профайл үүсгэх",
    "Add Family Member": "Гишүүн нэмэх",
    // ---- home ----
    "Welcome": "Тавтай морил",
    "Sign in to see your match, or create a profile to join.": "Хэнийг сугалсанаа харахын тулд нэвтэрнэ үү, эсвэл профайл үүсгэж нэгдээрэй.",
    "Names are drawn. Your match is ready.": "Нэрсийг сугалсан. Таны сугалсан хүн бэлэн боллоо.",
    "You joined after the draw. Ask the organizer to redraw.": "Та сугалаанаас хойш нэгдсэн. Зохион байгуулагчаас дахин сугалуулахыг хүснэ үү.",
    "You're in. Names haven't been drawn yet.": "Та бүртгэгдлээ. Нэрсийг хараахан сугалаагүй байна.",
    "You drew": "Таны сугалсан",
    "See wishlist": "Хүслийн жагсаалтыг харах",
    "Expand all": "Бүгдийг дэлгэх",
    "Collapse all": "Бүгдийг хураах",
    "No one yet": "Одоохондоо хэн ч алга",
    "Members will appear here once the organizer adds names or they join.": "Зохион байгуулагч нэр нэмэх эсвэл гишүүд нэгдэхэд энд харагдана.",
    " of ": " / ",
    " in": " нэгдсэн",
    // ---- profile popup ----
    "In the exchange.": "Солилцоонд оролцож байна.",
    "Hasn't joined yet. They'll show up here once they pick their name.": "Хараахан нэгдээгүй. Нэрээ сонгосны дараа энд харагдана.",
    "Nothing added yet.": "Одоохондоо юу ч нэмээгүй байна.",
    "Edit my profile": "Профайлаа засах",
    // ---- sign in ----
    "Use the email and password you created for this page.": "Энэ хуудсанд үүсгэсэн имэйл болон нууц үгээ ашиглана уу.",
    "Signing in…": "Нэвтэрч байна…",
    "Create a profile": "Профайл үүсгэх",
    "Forgot your password?": "Нууц үгээ мартсан уу?",
    "Email me a reset link": "Сэргээх холбоосыг имэйлээр авах",
    "Email me a password reset link": "Нууц үг сэргээх холбоосыг имэйлээр авах",
    "Enter your email and password.": "Имэйл болон нууц үгээ оруулна уу.",
    "Type your email above first, then tap \"Forgot password\".": "Эхлээд дээр имэйлээ бичээд «Нууц үгээ мартсан» дээр дарна уу.",
    "That email and password don't match. Check them, or tap \"Forgot password\".": "Имэйл эсвэл нууц үг таарахгүй байна. Шалгана уу, эсвэл «Нууц үгээ мартсан» дээр дарна уу.",
    "That email already has an account. Use Sign in instead.": "Энэ имэйлээр аль хэдийн бүртгэл үүссэн байна. Нэвтрэх хэсгийг ашиглана уу.",
    "Choose a password with at least 6 characters.": "Хамгийн багадаа 6 тэмдэгттэй нууц үг сонгоно уу.",
    "That email address doesn't look right.": "Имэйл хаяг буруу байна.",
    "Too many tries. Wait a few minutes, then try again.": "Хэт олон оролдлоо. Хэдэн минут хүлээгээд дахин оролдоно уу.",
    "No connection. Check your internet and try again.": "Холболт алга. Интернэтээ шалгаад дахин оролдоно уу.",
    "Something went wrong. Please try again.": "Алдаа гарлаа. Дахин оролдоно уу.",
    // ---- profile form ----
    "Create your profile": "Профайлаа үүсгэнэ үү",
    "Pick your family, add a photo, and share what you'd love. You'll be matched with someone from another family.": "Гэр бүлээ сонгоод, зургаа нэмж, юу авмаар байгаагаа хуваалцаарай. Танд өөр гэр бүлийн хүн таарна.",
    "Whoever draws you sees your latest wishlist. You can change your family or name any time.": "Таныг сугалсан хүн таны хамгийн сүүлийн хүслийн жагсаалтыг харна. Гэр бүл, нэрээ хэзээ ч өөрчилж болно.",
    "Frame": "Хүрээ",
    "Surprise me": "Санамсаргүй сонгох",
    "Change photo": "Зураг солих",
    "Add profile picture": "Профайл зураг нэмэх",
    "Adjust": "Тохируулах",
    "remove": "устгах",
    "Use this photo": "Энэ зургийг ашиглах",
    "Drag to move · slide to zoom": "Чирж зөөнө · гулсуулж томруулна",
    "Zoom": "Томруулах",
    "That photo couldn't be read. Try a JPG or PNG.": "Зургийг уншиж чадсангүй. JPG эсвэл PNG оролдоно уу.",
    "A gift idea, or paste a link": "Бэлгийн санаа бичих эсвэл холбоос буулгах",
    "Remove item": "Хасах",
    "Your name": "Таны нэр",
    "Your family": "Таны гэр бүл",
    "Choose…": "Сонгох…",
    "Who are you?": "Та хэн бэ?",
    "My name isn't listed": "Миний нэр жагсаалтад алга",
    "Type my name below": "Нэрээ доор бичнэ",
    "Your email": "Таны имэйл",
    "You'll sign in with this. It's only used for logging in and password resets, and other people can't see it.": "Та үүгээр нэвтэрнэ. Зөвхөн нэвтрэх, нууц үг сэргээхэд ашиглагдах бөгөөд бусад хүн харахгүй.",
    "Confirm password": "Нууц үгээ давтах",
    "At least 6 characters. Don't reuse an important password; this is a casual family page.": "Дор хаяж 6 тэмдэгт. Чухал нууц үгээ бүү давтаарай; энэ бол энгийн гэр бүлийн хуудас.",
    "+ Add another": "+ Өөр нэмэх",
    "Saving…": "Хадгалж байна…",
    "Save changes": "Өөрчлөлтийг хадгалах",
    // ---- save / account messages ----
    "Enter a valid email address. You'll use it to sign in.": "Зөв имэйл хаяг оруулна уу. Үүгээр нэвтэрнэ.",
    "The two passwords don't match.": "Хоёр нууц үг таарахгүй байна.",
    "Please choose your family.": "Гэр бүлээ сонгоно уу.",
    "Please enter your name.": "Нэрээ оруулна уу.",
    "That name is the organizer's. Pick it from the family list instead of typing it.": "Энэ нэр зохион байгуулагчийнх. Бичихийн оронд гэр бүлийн жагсаалтаас сонгоно уу.",
    "Welcome! You're in.": "Тавтай морил! Та бүртгэгдлээ.",
    "Welcome! You're in ✓": "Тавтай морил! Та бүртгэгдлээ ✓",
    "Saved.": "Хадгаллаа.",
    "Saved ✓": "Хадгаллаа ✓",
    "Sign-ups closed when the names were drawn. Ask the organizer if you still need to join.": "Нэрсийг сугалсны дараа бүртгэл хаагдсан. Нэгдэх шаардлагатай бол зохион байгуулагчаас асуугаарай.",
    "Couldn't save. Please sign out, sign back in and try again.": "Хадгалж чадсангүй. Гараад, дахин нэвтэрч оролдоно уу.",
    "Couldn't save just now. Please try again.": "Одоогоор хадгалж чадсангүй. Дахин оролдоно уу.",
    "Can't connect right now": "Одоогоор холбогдож чадахгүй байна",
    "The page couldn't reach its database. Check your internet connection and reload.": "Хуудас мэдээллийн санд холбогдож чадсангүй. Интернэт холболтоо шалгаад дахин ачаална уу.",
    "This is taking a while. The page will update when it connects.": "Удаан байна. Холбогдмогц хуудас шинэчлэгдэнэ.",
    // ---- my match ----
    "Names haven't been drawn yet": "Нэрсийг хараахан сугалаагүй байна",
    "You joined after the draw": "Та сугалаанаас хойш нэгдсэн",
    "Ask the organizer to run the draw again so you're included.": "Таныг оруулахын тулд зохион байгуулагчаас сугалааг дахин явуулахыг хүснэ үү.",
    "Your match left the exchange": "Таны сугалсан хүн солилцооноос гарсан",
    "Ask the organizer to run the draw again.": "Зохион байгуулагчаас сугалааг дахин явуулахыг хүснэ үү.",
    "You're Secret Santa for": "Та нууц Санта болох хүн",
    "They haven't added anything yet. Check back soon.": "Тэд хараахан юу ч нэмээгүй байна. Удахгүй дахин шалгаарай.",
    // ---- organizer ----
    "Family roster": "Гэр бүлийн жагсаалт",
    "Add everyone you expect. Home shows them as \"Not yet\" until they join and pick their name.": "Хүлээж буй хүн бүрээ нэмээрэй. Тэднийг нэгдэж нэрээ сонгох хүртэл Нүүр хэсэгт «Хараахан үгүй» гэж харагдана.",
    "🎉 Add family member": "🎉 Гишүүн нэмэх",
    "Draw names": "Нэр сугалах",
    "Matches never pair two people from the same family. Needs at least 3 people who have joined.": "Нэг гэр бүлийн хоёр хүн хэзээ ч хоорондоо таардаггүй. Хамгийн багадаа 3 хүн нэгдсэн байх шаардлагатай.",
    "Yes, redraw everyone": "Тийм, бүгдийг дахин сугал",
    "Redraw names": "Нэрийг дахин сугалах",
    "Yes, clear": "Тийм, цэвэрлэ",
    "Clear draw": "Сугалааг цэвэрлэх",
    "Redrawing replaces every current match.": "Дахин сугалбал одоогийн бүх хослол солигдоно.",
    "No one yet.": "Одоохондоо хэн ч алга.",
    "No valid draw is possible with the current sign-ups. Usually one family is more than half of everyone who has joined.": "Одоогийн бүртгэлээр сугалаа явуулах боломжгүй байна. Ихэвчлэн нэг гэр бүл нийт оролцогчдын талаас илүүг эзэлж байвал ингэдэг.",
    "Names drawn. Everyone can now open \"My match\".": "Нэрсийг сугалчихлаа. Одоо хүн бүр «Миний хүн» хэсгийг нээж болно.",
    "Couldn't save the draw. Please try again.": "Сугалааг хадгалж чадсангүй. Дахин оролдоно уу.",
    "Draw cleared.": "Сугалаа цэвэрлэгдлээ.",
    "Couldn't clear the draw.": "Сугалааг цэвэрлэж чадсангүй.",
    "Couldn't remove that person.": "Тэр хүнийг хасаж чадсангүй.",
    "Couldn't add that name.": "Тэр нэрийг нэмж чадсангүй.",
    "Couldn't remove that name.": "Тэр нэрийг хасаж чадсангүй.",
    "That person": "Тэр хүн",
    "Heads up before the draw": "Сугалахын өмнө анхаараарай",
    "Not joined yet": "Хараахан нэгдээгүй",
    "Thanksgiving draw": "Талархлын баярын сугалаа",
    "Names are drawn on Thanksgiving": "Нэрсийг Талархлын баяраар сугална",
    "Drawing names…": "Нэрсийг сугалж байна…",
    "Thursday, Nov 26 · 7:00 PM ET": "11-р сарын 26, Пүрэв гараг · орой 7:00 (ET)",
    "Days": "Өдөр", "Hours": "Цаг", "Min": "Мин", "Sec": "Сек",
    "Name draw": "Нэр сугалах",
    "Names are drawn automatically on Thanksgiving, Thursday Nov 26 at 7:00 PM ET, while your page is open. If it is closed then, opening it later draws right away. Matches never pair two people from the same family.": "Нэрсийг Талархлын баяраар, 11-р сарын 26-ны Пүрэв гарагийн орой 7:00 (ET) цагт, таны хуудас нээлттэй байхад автоматаар сугална. Тэр үед хаалттай байвал дараа нь нээхэд шууд сугална. Нэг гэр бүлийн хоёр хүн хэзээ ч хоорондоо таардаггүй.",
    "Fewer than 3 people have joined, so no draw can run yet.": "Гурваас цөөн хүн нэгдсэн тул сугалаа явуулах боломжгүй байна.",
    "No gift idea yet": "Бэлгийн санаа хараахан байхгүй",
    "Everyone has joined and added a gift idea. Ready to draw.": "Хүн бүр нэгдэж, бэлгийн санаагаа нэмсэн. Сугалахад бэлэн.",
    // ---- welcome page ----
    "You're invited": "Та урилгатай!",
    "Tap to continue": "Үргэлжлүүлэхийн тулд дарна уу",
    "Developed with": "",
    "love": "Хайраар",
    "by Anand Tsogtbaatar": "бүтээв · Anand Tsogtbaatar",
    // ---- frames ----
    "None": "Хүрээгүй", "Gold": "Алтан", "Holiday": "Баярын", "Snow": "Цас", "Sunset": "Жаргах нар", "Pine": "Нарс",
    "Rainbow": "Солонго", "Neon": "Неон", "Candy cane": "Чихрийн таяг", "Aurora": "Туяа", "Fairy lights": "Гэрэлт чимэг",
    "Fire": "Гал", "Galaxy": "Галактик", "Frost": "Хяруу",
    "Cocoa": "Какао", "Ocean": "Далай", "Sakura": "Сакура", "Steppe": "Тал нутаг", "Blue sky": "Хөх тэнгэр",
    "Santa": "Санта", "Crown": "Титэм", "Antlers": "Буганы эвэр", "Bow": "Бантан", "Tree": "Гацуур",
    "Snowman": "Цасан хүн", "Gift": "Бэлэг", "Heart": "Зүрх", "Star": "Од", "Sparkle": "Гялбаа",
    "Classic": "Сонгодог", "Glow & motion": "Гэрэлтэх, хөдлөх", "Cozy & local": "Дулаахан, монгол", "Stickers": "Наалт",
    // ---- snowman ----
    "I'm back! Did anyone miss me? ☃": "Би буцаж ирлээ! Хэн нэг намайг санасан уу? ☃",
    "I'm melting! Tell the carrots I loved them 🥕": "Би хайлж байна! Лууванд би хайртай байсан гэж хэлээрэй 🥕",
    "Home sweet home! ❄": "Гэр шиг гэр алга! ❄",
    "Oof! 😵": "Оёё! 😵",
    "Ouch! Who poked me?": "Ай! Хэн намайг түлхэв?",
    "Whoa… the room is spinning": "Вау… өрөө эргэлдэж байна",
    "Timber! 🌲": "Мод унаж байна! 🌲",
    "Ha! Good one. Now try dragging me up high!": "Ха! Сайн байна. Одоо намайг өндөрт чирээд үз!",
    "Again! Again!": "Дахиад! Дахиад!",
    "Okay, okay… I'm dizzy!": "За, за… толгой эргэж байна!",
    "Poke me again, I dare you 😏": "Дахин түлхээд үз, зүрхлэх үү 😏",
    "Hey, I was just standing here!": "Хөөе, би зүгээр л зогсож байсан юм!",
    "Wheee! Now poke me 👉": "Уухаа! Одоо намайг товшоорой 👉",
    "Nice spot!": "Сайхан газар байна!",
    "Wheee! ✨": "Уухаа! ✨",
    "Put me anywhere!": "Хаана ч тавь!",
    "Cozy up here ☃": "Энд дулаахан ☃",
    "I'd tell you a snow joke, but it might go over your head.": "Цасны хошин үлгэр ярих байсан ч толгой дээгүүр чинь нисэх байх.",
    "Cold hands, warm heart, zero pockets.": "Хүйтэн гар, дулаан зүрх, халаас огт байхгүй.",
    "Who did I draw? I'd tell you, but I can't keep a secret… I mean I CAN. Never mind.": "Би хэнийг сугалсан бэ? Хэлэх байсан ч нууц хадгалж чаддаггүй… үгүй, ЧАДНА. Мартаарай.",
    "Flurry up and finish your wishlist!": "Цасан шуургатай нь хурдлаад хүслийн жагсаалтаа дуусга!",
    "I'm on thin ice with the elves.": "Би одойнуудтай нимгэн мөс дээр алхаж байна.",
    "Is it just me, or is it getting warm in here?": "Зөвхөн надад тэр үү, эсвэл энд дулаарч байна уу?",
    "I asked Santa for a scarf. He said I already have one. Rude.": "Санталаас ороолт гуйсан. Чамд аль хэдийн байгаа гэсэн. Увайгүй.",
    "I'm not saying I'm Santa's favorite, but I do have a carrot.": "Сантагийн дуртай нь гэж хэлэхгүй ээ, гэхдээ надад луувангийн хамар бий.",
    "Brrr… I mean, I'm always like this.": "Бррр… Би үргэлж иймэрхүү байдаг юм.",
    "Pro tip: gift cards are just snowflakes for grown-ups.": "Зөвлөгөө: бэлгийн карт бол томчуудын цасан ширхэг.",
    "Sleigh the day! 🎄": "Өдрийг чихэр шиг өнгөрүүл! 🎄",
    "Why was the snowman cranky? Bad case of ice-itis.": "Цасан хүн яагаад ууртай байсан бэ? Мөсний өвчинд нэрвэгдсэн.",
    "No peeking at the draw! I see you, Uncle.": "Сугалааг шагайж болохгүй! Би чамайг харж байна, нагац аав аа.",
    "I put the \"snow\" in \"snow way am I telling you who I drew.\"": "Хэнийг сугалснаа чамд хэлэх «цас» ч үгүй шүү.",
    "Wrap it with love. Or tape. Mostly tape.": "Хайраар ороогоорой. Эсвэл скотчоор. Ихэвчлэн скотчоор.",
    "My carrot nose is non-negotiable.": "Миний луувангийн хамар хэлэлцэх зүйл биш.",
    "If you get socks, act surprised. It's tradition.": "Оймс авбал гайхсан царай гарга. Уламжлал шүү дээ.",
    "Psst… poke me! 👉": "Псс… намайг товшоорой! 👉",
    "Go on, give me a poke": "Тавтай, нэг товшоод үз",
    "Psst… drag me around! ✋": "Псс… намайг чирээд үз! ✋",
    "Pick me up and take me anywhere!": "Намайг барьж аваад хаа ч аваач!",
    "Tap me… I dare you 😏": "Намайг товш… зүрхлэх үү 😏"
  };

  var MN = Object.create(null);
  Object.keys(RAW).forEach(function(k){ MN[norm(k)] = RAW[k]; });

  function esc(n){ return n; }
  var PAT = [
    [/^(\d+) of (\d+) in$/, function(m){ return m[1] + " / " + m[2] + " нэгдсэн"; }],
    [/^of (\d+) in$/, function(m){ return "/ " + m[1] + " нэгдсэн"; }],
    [/^\$(\d+) limit$/, function(m){ return "$" + m[1] + " хүртэл"; }],
    [/^(.+) · \$(\d+) limit$/, function(m){ return m[1] + " · $" + m[2] + " хүртэл"; }],
    [/^Hi, (.+)$/, function(m){ return "Сайн уу, " + m[1]; }],
    [/^(.+) family$/, function(m){ return m[1] + " гэр бүл"; }],
    [/^(.+) profile$/, function(m){ return m[1] + " — профайл"; }],
    [/^View (.+)'s profile$/, function(m){ return "Профайл харах: " + m[1]; }],
    [/^(.+)'s wishlist$/, function(m){ return m[1] + ": хүслийн жагсаалт"; }],
    [/^Joined the exchange on (.+)\.$/, function(m){ return "Солилцоонд нэгдсэн: " + m[1] + "."; }],
    [/^Budget \$(\d+) · keep it secret until gift opening$/, function(m){ return "Төсөв $" + m[1] + " · бэлгээ нээх хүртэл нууцлаарай"; }],
    [/^Wishlist · up to \$(\d+)$/, function(m){ return "Хүслийн жагсаалт · $" + m[1] + " хүртэл"; }],
    [/^Signed in as (.+)\. Finish your profile to join the exchange\.$/, function(m){ return m[1] + " хаягаар нэвтэрсэн. Солилцоонд нэгдэхийн тулд профайлаа гүйцээнэ үү."; }],
    [/^Signed in as (.+)$/, function(m){ return m[1] + " хаягаар нэвтэрсэн"; }],
    [/^If (.+) has an account, a reset link is on its way\. Check your spam folder too\.$/, function(m){ return "Хэрэв " + m[1] + " хаягаар бүртгэл байгаа бол сэргээх холбоос илгээгдэнэ. Спам хавтсаа бас шалгаарай."; }],
    [/^A password reset link is on its way to (.+)\.$/, function(m){ return "Нууц үг сэргээх холбоос " + m[1] + " хаяг руу илгээгдэж байна."; }],
    [/^(\d+) (?:person has|people have) joined\. Your match will appear here after the organizer runs the draw\.$/, function(m){ return m[1] + " хүн нэгдсэн. Зохион байгуулагч сугалаа явуулсны дараа таны сугалсан хүн энд харагдана."; }],
    [/^Drawn for (\d*) people\.(?: (\d+) newer sign-ups? (?:are|is) not included yet\.)?$/, function(m){ return (m[1] ? m[1] + " хүнд " : "") + "сугалсан." + (m[2] ? " " + m[2] + " шинэ бүртгэл хараахан орсонгүй." : ""); }],
    [/^People who joined \((\d+)\)$/, function(m){ return "Нэгдсэн хүмүүс (" + m[1] + ")"; }],
    [/^(.+) was removed\. If names were already drawn, run the draw again\.$/, function(m){ return m[1] + " хасагдлаа. Нэрсийг аль хэдийн сугалсан бол сугалааг дахин явуулна уу."; }],
    [/^Gift budget is \$(\d+)\. I'm watching\. 👀$/, function(m){ return "Бэлгийн төсөв $" + m[1] + ". Би харж байна. 👀"; }]
  ];

  function T(s){
    if (lang !== "mn" || typeof s !== "string" || !s) return s;
    var n = norm(s), r = MN[n];
    if (r !== undefined) return r;
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(n), core = m[2];
    if (core && core !== n){ r = MN[core]; if (r !== undefined) return m[1] + r + m[3]; }
    for (var i = 0; i < PAT.length; i++){
      var mm = PAT[i][0].exec(core || n);
      if (mm) return m[1] + PAT[i][1](mm) + m[3];
    }
    return s;
  }
  function apply(){
    try {
      document.documentElement.lang = lang === "mn" ? "mn" : "en";
      if (document.body) document.body.classList.toggle("mn", lang === "mn");
      document.title = T("Family Gift Exchange");
    } catch(e){}
  }
  function set(l){
    if (l !== "mn" && l !== "en") return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch(e){}
    apply();
    listeners.slice().forEach(function(f){ try { f(l); } catch(e){} });
  }
  window.GXI = {
    T: T,
    get lang(){ return lang; },
    set: set,
    apply: apply,
    onChange: function(f){ listeners.push(f); }
  };
})();
