function publicationDate(fecha) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(fecha);
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    return `${month} ${dayOfMonth}, ${year}`
}    

export default publicationDate;