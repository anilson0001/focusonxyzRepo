let cover = (()=>
{
    function userPercentage()
    {
    /*
        apps.analitics: set by frmReport.js --> frmReport.reportPage.objOption()
    */
        setTimeout(function()
        { 
            let percent="";
            let maxPoints   =  1;
            if(parseInt(percent)!==0)
            {
                maxPoints   *=  1000;
                let points      = 100;  //((Number(apps.analitics.kpo.points) * Number(apps.analitics.kpo.percent)) + (Number(apps.analitics.kpe.points) * Number(apps.analitics.kpe.percent)) + (Number(apps.analitics.kpa.points) * Number(apps.analitics.kpa.percent))); 
                let percent     = ((points / maxPoints) * 100);
            
                document.getElementById("3FPerformance").innerHTML = "<div>Performance: " + Number(percent).toFixed(2) + "%</div><div>Points: " + Number(points).toFixed(2) + "</div>"; 
                document.getElementById("3FPerformance").classList.add("initialPerformance");
            }
            else
            {   console.log("checkpoint (uPercentage): "); userPercentage();    }
            
        },3000);
    }
    
    
    function Motivation()
    {
        const arrPhrases = 
        [
            [["Be nice, be forgiving but don't be a pushover"],["Prisoner's Dilemma Game"]],
            [["Success is not final, failure is not fatal: it is the courage to continue that counts."],["Winston Churchill"]],
            [["High performance is not about what you do, but who you become."],[]],
            [["The difference between ordinary and extraordinary is that little extra."],["Jimmy Johnson"]],
            [["Success is not for the lazy."],[""]],
            [["The harder you work, the luckier you get."],["Gary Player"]],
            [["Champions keep playing until they get it right."],["Billie Jean King"]],
            [["Good is not enough if better is possible."],["Vin Scully"]],
            [["Success is not a destination, it's a journey."],[""]],
            [["The only way to do great work is to love what you do."],["Steve Jobs"]],
            [["I am not a product of my circumstances. I am a product of my decisions."],["Stephen Covey"]],
            [["High performance is the result of habitual excellence."],[""]],
            [["The best way to predict the future is to create it."],["Peter Drucker"]],
        //    [["Your only limit is the amount of action you take."],[""]],
            [["You are never too old to set another goal or to dream a new dream."],["C.S. Lewis"]],
            [["The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack of will."],["Vince Lombardi"]],
            [["Excellence is not a skill, it's an attitude."],["Ralph Marston"]],
            [["The only limit to our realization of tomorrow will be our doubts of today."],["Franklin D. Roosevelt"]],
            [["High performance is about the pursuit of excellence, not the pursuit of perfection."],[""]],
            [["What you get by achieving your goals is not as important as what you become by achieving your goals."],["Zig Ziglar"]],
            [["Success is not measured by what you accomplish, but by the opposition you have encountered, and the courage with which you have maintained the struggle against overwhelming odds."],["Orison Swett Marden"]],
            [["Believe you can and you're halfway there."],["Theodore Roosevelt"]],
            [["There are no shortcuts to any place worth going."],["Beverly Sills"]],
            [["Strive not to be a success, but rather to be of value."],["Albert Einstein"]],
            [["High performance is the result of consistent, intentional action."],[""]],
            [["The more you know yourself, the more clarity there is. Self-knowledge has no end."],["Jiddu Krishnamurti"]],
            [["The key to success is to focus our conscious mind on things we desire, not things we fear."],["Brian Tracy"]],
            [["Don't watch the clock; do what it does. Keep going."],["Sam Levenson"]],
            [["The successful warrior is the average man, with laser-like focus."],["Bruce Lee"]],
            [["The greatest glory in living lies not in never falling, but in rising every time we fall."],["Nelson Mandela"]],
            [["The journey of a thousand miles begins with one step."],["Lao Tzu"]],
            [["High performance is not a gift, it's a choice."],[""]],
            [["Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle."],["Christian D. Larson"]],
            [["You miss 100% of the shots you don't take."],["Wayne Gretzky"]],
            [["The only place where success comes before work is in the dictionary."],["Vidal Sassoon"]],
            //"The greatest danger for most of us is not that our aim is too high and we
            [["The only limit to our realization of tomorrow will be our doubts of today."],["Franklin D. Roosevelt"]],
        //    [["Believe you can and you're halfway there."],["Theodore Roosevelt"]],
            [["Your only limit is the amount of action you take."],["Tony Robbins"]],
        //    [["The greatest glory in living lies not in never falling, but in rising every time we fall."],["Nelson Mandela"]],
            [["Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful."],["Albert Schweitzer"]],
            [["Champions keep playing until they get it right."],["Billie Jean King"]],
            [["It's not about perfect. It's about effort. And when you bring that effort every single day, that's where transformation happens. That's how change occurs."],["Jillian Michaels"]],
        //    [["The difference between ordinary and extraordinary is that little extra."],["Jimmy Johnson"]],
            [["It does not matter how slowly you go as long as you do not stop."],["Confucius"]],
        //    [["What you get by achieving your goals is not as important as what you become by achieving your goals."],["Zig Ziglar"]],
            [["If you can't fly then run, if you can't run then walk, if you can't walk then crawl, but whatever you do you have to keep moving forward."],["Martin Luther King Jr."]],
            [["You are never too old to set another goal or to dream a new dream."],["C.S. Lewis"]],
        //    [["The only way to do great work is to love what you do."],["Steve Jobs"]],
            [["Success is walking from failure to failure with no loss of enthusiasm."],["Winston Churchill"]],
            [["I have not failed. I've just found 10,000 ways that won't work."],["Thomas Edison"]],
            [["The man who moves a mountain begins by carrying away small stones."],["Confucius"]],
            [["Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle."],["Christian D. Larson"]],
            [["Success is not the absence of failure; it's the persistence through failure."],["Aisha Tyler"]],
        //    [["The only place where success comes before work is in the dictionary."],["Vidal Sassoon"]],
            [["Be not afraid of greatness. Some are born great, some achieve greatness, and others have greatness thrust upon them."],["William Shakespeare"]],
            [["The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence."],["Confucius"]],
            [["The harder the conflict, the more glorious the triumph."],["Thomas Paine"]],
            [["The only way of discovering the limits of the possible is to venture a little way past them into the impossible."],["Arthur C. Clarke"]],
            [["Start where you are. Use what you have. Do what you can."],["Arthur Ashe"]],
            [["What you lack in talent can be made up with desire, hustle and giving 110% all the time."],["Don Zimmer"]],
            [["Your time is limited, don't waste it living someone else's life."],["Steve Jobs"]],
            [["Perfection is not attainable, but if we chase perfection we can catch excellence."],["Vince Lombardi"]],
            [["I've failed over and over and over again in my life and that is why I succeed."],["Michael Jordan"]],
            [["The greatest wealth is to live content with little."],["Plato"]],
            [["Success is liking yourself, liking what you do, and liking how you do it."],["Maya Angelou"]],
            [["Success is not in what you have, but who you are."],["Bo Bennett"]],
            [["If you don't design your own life plan, chances are you'll fall into someone else's plan. And guess what they have planned for you? Not much."],["Jim Rohn"]],
            [["I'm a great believer in luck, and I find the harder I work, the more I have of it."],["Thomas Jefferson"]],
            [["You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose."],["Dr. Seuss"]],
            [["Don't let yesterday take up too much of today."],["Will Rogers"]],
            [["If you're going through hell, keep going."],["Winston Churchill"]],
            [["A year from now you may wish you had started today."],["Karen Lamb"]],
            [["Believe in your dreams and they may come true; believe in yourself and they will come true."],["Unknown"]],
            [["The only person you are destined to become is the person you decide to be."],["Ralph Waldo Emerson"]],
            [["If you don't stand for something, you will fall for anything."],["Malcolm X"]],
            [["The best way to predict the future is to create it."],["Peter Drucker"]],
            [["When everything seems to be going against you, remember that the airplane takes off against the wind, not with it."],["Henry Ford"]],
            [["It's not what you look at that matters, it's what you see."],["Henry David Thoreau"]],
            [["The only thing standing between you and your goal is the bullshit story you keep telling yourself as to why you can't achieve it."],["Jordan Belfort"]],
            [["We are what we repeatedly do. Excellence, then, is not an act, but a habit."],["Aristotle"]],
            [["The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty."],["Winston Churchill"]],
            [["The more you sweat in training, the less you bleed in battle."],[]],
            [["The harder you work, the luckier you get."],["Gary Player"]],
            [["You can't build a reputation on what you're going to do."],["Henry Ford"]],
            [["There is no substitute for hard work."],[]],
            [["Your attitude determines your altitude."],[]],
            [["Nothing great was ever achieved without enthusiasm."],[]],
            [["If you want to go fast, go alone. If you want to go far, go together."],[]],
            [["Do what you love and you'll never work a day in your life."],[]],
            [["Strive for progress, not perfection."],["David Perlmutter"]],
            [["Work hard, play hard."],[]],
            [["Every accomplishment starts with the decision to try."],[]],
            [["Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle."],[]],
            [["Chase your dreams until they become your reality."],[]],
            [["The pain you feel today will be the strength you feel tomorrow."],[]],
            [["Hard work beats talent when talent doesn't work hard."],[]],
            [["If you can't stop thinking about it, don't stop working for it."],[]],
            [["Dreams don't work unless you do."],[]],
            [["Fall seven times, stand up eight."],["Japanese Proverb"]],
            [["Don't wait for opportunity. Create it."],[]],
            [["Don't stop when you're tired. Stop when you're done."],[]],
            [["The secret of getting ahead is getting started."],["Mark Twain"]],
            [["Life is 10% what happens to you and 90% how you react to it."],["Charles R. Swindoll"]],
            [["A goal without a plan is just a wish."],[]],
            [["Be so good they can't ignore you."],["Steve Martin"]],
            [["If you want to achieve greatness, stop asking for permission."],[]],
            [["Perseverance is failing 19 times and succeeding the 20th."],["Julie Andrews"]],
            [["The future belongs to those who believe in the beauty of their dreams"],["Eleanor Roosevelt"]],
            [["The mind is everything. What you think you become."],["Buddha"]],
            [["Don't be pushed around by the fears in your mind. Be led by the dreams in your heart."],[]],
            [["Great things never come from comfort zones."],[]],
            [["Never give up on something that you can't go a day without thinking about."],[]],
            [["The best way out is always through."],["Robert Frost"]],
            [["You are the master of your destiny. You can influence, direct and control your own environment. You can make your life what you want it to be."],[]],
            [["The more you know yourself, the more clarity there is. Self-knowledge has no end."],[]],
            [["Success is not something you pursue. Success is something you attract by the person you become."],[]],
            [["If you can dream it, you can achieve it."],[]],
            [["Be the change you want to see in the world."],[" Mahatma Gandhi"]],
            [["Success is the sum of small efforts, repeated day in and day out."],["Robert Collier"]],
            [["What lies behind us and what lies before us are tiny matters compared to what lies within us."],["Ralph Waldo Emerson"]],
            [["Failure is the opportunity to begin again more intelligently."],["Henry Ford"]],
            [["If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."],["Oprah Winfrey"]],
            [["I've missed more than 9,000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed."],["Michael Jordan"]],
            [["To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment."],["Ralph Waldo Emerson"]],
            [["It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest."],["Walter Anderson"]]
        ];
        
        
    /*    
        //get some more quotes from: https://www.shopify.com/blog/motivational-quotes?term=&adid=648010352812&campaignid=19683432691&term=&adid=648010352812&campaignid=19683432691&gclid=CjwKCAjw0N6hBhAUEiwAXab-Ta-DpIhd2AgkjsghYyzxHrn4-aC5CUts4Jo_FpKY79AI_L1nuEQ5aRoC7ncQAvD_BwE
    */    
        
        return  (function formatMessage()
                {
                    let arr;
                    let arrMaxLen = arrPhrases.length;
                    let pSelected = Math.floor(Math.random()*arrMaxLen);
                    
                    let p = arrPhrases[pSelected];
                    let author = (aux_existence(p[1][0]))? "by - <span id=\"mhAuthor\" class=\"motivatorAuthor\" >" + p[1][0] + "</span>": "";
                    
                    return  "<div id=\"mhMessage\" class=\"motivatorPhrase\" >" + p[0][0] + "</div>" + author;
                })();
    }  
    
    
    function AnimateSettings()
    {
        let timer;
        let headWidth = document.getElementById("headContainer").scrollWidth;
        
        if(Number(headWidth)>= 560)
        {   timer= 15000;}
        else
        {   timer= 7000; }
        
        
        setTimeout(function()
        { 
            //document.getElementById("3FMotivation").classList.remove("initialMessage");
            //document.getElementById("3FPerformance").classList.remove("initialPerformance");
        },Number(timer));
    }
    
    return {userPercentage, Motivation, AnimateSettings};
})();

function coverPage()
{
    let pcontainHeight = document.getElementById("pageContainer").scrollHeight;
    
    let menuStatus = document.getElementById("openMenu");
    if(aux_existence(menuStatus))
    {
        if(aux_existence(menuStatus.value))
        {
            if(apps.environment!=="mobile")
            {
                document.getElementById("mainContainer").style.marginBottom = "200px"; 
                document.getElementById("footContainer").classList.remove("footSecondAnimation_1"); 
            }
            
            document.getElementById(`${apps.environment}_loadRequest`).style.fontWeight='normal';
        }
        else
        {
            if(apps.environment!=="mobile")
            {
                document.getElementById("footContainer").classList.add("footSecondAnimation_1"); 
                document.getElementById("mainContainer").style.marginBottom = "20px"; 
            }
            
            document.getElementById(`${apps.environment}_loadRequest`).style.fontWeight='bold';  
        }
    }
}
