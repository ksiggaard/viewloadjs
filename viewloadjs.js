/* viewloadjs @Kasper Siggaard Andersen, 2016 */

var $ = jQuery.noConflict();

var viewLoad = {
    selector: '.viewload',
    inClass: 'viewload-in',
    outClass: 'viewload-out',
    toleranceX: 0,
    toleranceY: 0,
    setOutClass: true
};

viewLoad.init = function(params)
{
    if(params !== undefined){ $.extend(this, params); }

    this.indexObjects();
    this.check();
    
    $(window).scroll(this.check);
};

viewLoad.indexObjects = function()
{
    this.objects = $(viewLoad.selector);
};

viewLoad.viewBoxUpdate = function()
{
    this.viewBox = {
        minX: $(window).scrollLeft() + this.toleranceX,
        maxX: $(window).scrollLeft() + $(window).width() - this.toleranceX,
        minY: $(window).scrollTop() + this.toleranceY,
        maxY: $(window).scrollTop() + $(window).height() - this.toleranceY
    };
};

viewLoad.check = function()
{
    viewLoad.viewBoxUpdate();
    
    viewLoad.objects.each(function(){
        var object = {
            minY: $(this).offset().top,
            middleY: $(this).offset().top + ($(this).height() / 2),
            maxY: $(this).offset().top + $(this).height(),
            minX: $(this).offset().left,
            middleX: $(this).offset().left + ($(this).width() / 2),
            maxX: $(this).offset().left + $(this).width()
        };
        
        // Load X-axis
        if(object.middleX > viewLoad.viewBox.minX && object.middleX < viewLoad.viewBox.maxX) {
            $(this).removeClass(viewLoad.outClass).addClass(viewLoad.inClass);
        }
        
        // Unload X-axis
        if(viewLoad.setOutClass && (object.minX > viewLoad.viewBox.maxX || object.maxX < viewLoad.viewBox.minX)){
            $(this).addClass(viewLoad.outClass).removeClass(viewLoad.inClass);
        }
        
        // Load Y-axis
        if(object.middleY > viewLoad.viewBox.minY && object.middleY < viewLoad.viewBox.maxY) {
            $(this).removeClass(viewLoad.outClass).addClass(viewLoad.inClass);
        }
        
        // Unload Y-axis
        if(viewLoad.setOutClass && (object.minY > viewLoad.viewBox.maxY || object.maxY < viewLoad.viewBox.minY)){
            $(this).addClass(viewLoad.outClass).removeClass(viewLoad.inClass);
        }
    });
};

viewLoad.init();
