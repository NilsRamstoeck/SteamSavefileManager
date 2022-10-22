export default 0;

const minimizeButton = document.querySelector<HTMLElement>('.minimize-button')!;
const closeButton = document.querySelector<HTMLElement>('.close-button')!;

minimizeButton.addEventListener('click', _ => {
    IPC.minimize();
})

closeButton.addEventListener('click', _ => {
    IPC.close();
})