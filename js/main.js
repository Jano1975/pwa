//SERVICE WORKER
if ('serviceWorker' in navigator && 'PushManager' in window){
        console.log("Puedes usar los serviceworker y notificaciones push en tu navegador");

        
    }else{
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
    }

//NOTIFICACIONES PUSH 
const applicationServerPublicKey = 'BC1gSKjc_A60_Gd3EpZvEG86uxh8yoN2V5Ccb2 - z7yTHoifnZNgrtnypAFG - _U66arXXJ6u6ijl9B1s6Pwb26wA';
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function initialiseUI() {
    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            isSubscribed = !(subscription === null);

            if (isSubscribed) {
                console.log('User IS subscribed.');
            } else {
                console.log('User is NOT subscribed.');
            }

            updateBtn();
        });
}

function updateBtn() {
    if (isSubscribed) {
        pushButton.textContent = 'Desactivar notificaciones Push';
    } else {
        pushButton.textContent = 'Activar notificaciones Push';
    }

    pushButton.disabled = false;
}

function initialiseUI() {
    pushButton.addEventListener('click', function () {
        pushButton.disabled = true;
        if (isSubscribed) {
            // TODO: Unsubscribe user
        } else {
            subscribeUser();
        }
    });

    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            isSubscribed = !(subscription === null);

            updateSubscriptionOnServer(subscription);

            if (isSubscribed) {
                console.log('Estas suscripto');
            } else {
                console.log('No estas suscripto');
            }

            updateBtn();
        });
}

navigator.serviceWorker.register('./sw.js')
    .then(function (swReg) {
        console.log('El Service Worker esta registrado', swReg);

        swRegistration = swReg;
        initialiseUI();
    })


function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
        .then(function (subscription) {
            console.log('Estas suscripto:', subscription);

            updateSubscriptionOnServer(subscription);

            isSubscribed = true;

            updateBtn();
        })
        .catch(function (err) {
            console.log('No te has podido suscribir: ', err);
            updateBtn();
        });
}

function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server

    const subscriptionJson = document.querySelector('.js-subscription-json');
    const subscriptionDetails =
        document.querySelector('.js-subscription-details');

    if (subscription) {
        subscriptionJson.textContent = JSON.stringify(subscription);
        subscriptionDetails.classList.remove('is-invisible');
    } else {
        subscriptionDetails.classList.add('is-invisible');
    }
}


function updateBtn() {
    if (Notification.permission === 'denied') {
        pushButton.textContent = 'Notificaciones push bloqueadas.';
        pushButton.disabled = true;
        updateSubscriptionOnServer(null);
        return;
    }

    if (isSubscribed) {
        pushButton.textContent = 'Desactivar notificaciones Push';
    } else {
        pushButton.textContent = 'Activar notificaciones Push';
    }

    pushButton.disabled = false;
}
//SCROLL SUAVIZADO
$(document).ready(function(){
    $("#menu a").click(function(e){
        e.preventDefault();
        
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        
        return false;
    });
});