// main JS file

TimeLeftProject = {
    events: {
        "keydown input": "go",
        "click button.go": "go",
    },

    constants: {
        
        meanAge: 90,

        square: {
            spriteSize: 19.23
        }
    },

    functions: {

        getDays: function(month, date, year) {
            var birthday = new Date([month, date.toString(), year].join(" "));
          
            var daysLived = Math.floor(((new Date().getTime() - birthday.getTime()) / 31536000000) * 26);
            var daysTotal = TimeLeftProject.constants.meanAge * 27;

            console.log("DAYS LIVED: ", daysLived);
            console.log("DAYS TOTAL: ", daysTotal);

            return {
                lived: daysLived,
                total: daysTotal
            };
        },

        getBirthdate: function() {
            return {
                month: $("#birthmonth").value,
                date: $("#birthday").value,
                year: $("#birthyear").value
            };
        },

        drawViz: function(lived, total) {
        
            var vizContainer = $(".viz-container");
            var spriteSize = TimeLeftProject.constants.square.spriteSize;   
            vizContainer.style.display = "block";

            var vizContainerWidth = getWidthOf(vizContainer);
            
            var horizCount = parseFloat(`${vizContainerWidth - vizContainerWidth % spriteSize}px`) / spriteSize;

            console.log("HORIZ COUNT: ", horizCount);
            console.log("LIVED HEIGHT: = ", lived, " / ", horizCount, " * ", spriteSize, " = ", Math.floor(lived / horizCount) * spriteSize);
            console.log("TOTAL WIDTH = (", total, " % ", horizCount, ') * ', spriteSize, " = ", (total % horizCount) * spriteSize);

            var livedHeight = Math.floor(lived / horizCount) * spriteSize,
                livedWidth = (lived % horizCount) * spriteSize,
                totalHeight = Math.floor(total / horizCount) * spriteSize  - 1,
                totalWidth = (total % horizCount) * spriteSize;

            $("#squares-lived .chunk").style.height = `${livedHeight}px`;
            $("#squares-lived .remainder").style.width = `${livedWidth}px`;

            $("#squares-total .chunk").style.height = `${totalHeight}px`;
            $("#squares-total .remainder").style.width = `${totalWidth}px`;
            
            $(".viz-container").style.height = `${totalHeight + 300}px`;
        },

        go: function(event) {
            // master task runner for "go" button
            if (event instanceof KeyboardEvent && event.keyCode == 13) {

            var dateObject = TimeLeftProject.functions.getBirthdate();
            
            var squareCounts = TimeLeftProject.functions.getDays(
                  dateObject.month,
                  dateObject.date,
                  dateObject.year
            );

            TimeLeftProject.functions.drawViz(squareCounts.lived, squareCounts.total);
            $('.viz-container').scrollIntoView({behavior: 'smooth'});
            // $('.viz-container').scrollRight(500);

            }
        },

    },
    
    
};

function init() {

    $(".viz-container").style.display = "none";

    // add event listeners
    Object.keys(TimeLeftProject.events).forEach(function(identifier) {
        var eventName = identifier.split(" ")[0],
            selector = identifier.split(" ").splice(1).join(" "),
            fn = TimeLeftProject.functions[TimeLeftProject.events[identifier]];

        eventAdder(selector, eventName, fn);
    });

    console.info("TimeLeftProject initialized");

}

init();