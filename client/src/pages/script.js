document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.animate-on-scroll .items');

    function callback(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }

    const observer = new IntersectionObserver(callback);
 
    elements.forEach(element => {
        observer.observe(element);
    });
});
