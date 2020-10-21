window.onload = async () => {
    const pupilRes = await fetch('/randomPupil');
    const pupilJson = await pupilRes.json();
    document.getElementById('pupil-name').innerText = pupilJson.name;
};