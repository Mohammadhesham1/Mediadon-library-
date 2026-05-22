const FILE_IDS = {
  "56": "BAACAgIAAxkBAAMFahAEHnxley9xqpeFHEezPKXuSNsAAk4zAAJqe2BJzRQ4J2MKZUM7BA",
  "57": "BAACAgIAAxkBAAMGahAEHkQO7CP43RtMvmHd9WLY5pkAAnEtAAIsrMFI5IQYH-yjDk07BA",
  "59": "BAACAgIAAxkBAAMHahAEHsCDIbDVFBYVpsI6t4TFOmEAAhkzAAI3UkBJ-jhj6xV9BGE7BA",
  "62": "BAACAgQAAxkBAAMIahAEHleyjqihdGxcleRjyvWaXpAAAk0cAAJq8qFTerRAx9GDST87BA",
  "63": "BAACAgIAAxkBAAMJahAEHuLvBJOo55U6LEN04kMCSXYAAtc_AAKiFKlIM23MrG6eN1c7BA",
  "64": "BAACAgIAAxkBAAMKahAEHnDdSuy9bnrHKsX9dTayn4sAAvZCAAJ_m7lJTlQT5q0z73g7BA",
  "65": "BAACAgIAAxkBAAMLahAEHr6Vr7lGxHnvylluSeveCBgAAto_AALk4VBKarqxc0QtFzU7BA",
  "66": "BAACAgIAAxkBAAMMahAEHoHTdq4Nt5gVzvWf5RBwn1AAAq5BAAKbIaBLXPYjwBh7dzY7BA",
  "67": "BAACAgIAAxkBAAMNahAEHo--s97CZqCIsRAchn_fuC8AAuFEAAID9-BL9JOEAAFECVAaOwQ",
  "70": "BAACAgIAAxkBAAMOahAEHk9Awxq8djyYzvMYdZTgmEwAAlI9AAJdeDFI7Bal8AABD45tOwQ",
  "71": "BAACAgIAAxkBAAMPahAEHmvYmI--wdfIIjt2e8wY3SgAAqdIAAJsOsFITqAgzrUnWB87BA",
  "74": "BAACAgIAAxkBAAMQahAEHmYKSd-FyknGL2gyS3y7NoIAApOWAAJm2NhKM8E63B6-J4w7BA",
  "75": "BAACAgIAAxkBAAMRahAEHqV4Muj1htrpc9_qJi9Viy8AAh1tAAI1r_hJoigQxG1Y-rI7BA",
  "76": "BAACAgIAAxkBAAMSahAEHlRuZSaEBTQCXU063NejQnQAAmVyAAI7GrhK4One5rA3OTg7BA",
  "77": "BAACAgIAAxkBAAMTahAEHo2TncEaZGV_A-nCUG_xEDwAAo1vAAJkvVFL1Weuv-Mrj-k7BA",
  "78": "BAACAgQAAxkBAAMUahAEHqfrYItRr69CZOPveYLw0XUAAnkbAAIoj0hTitG5ISV-bw47BA",
  "79": "BAACAgIAAxkBAAMVahAEHjQYH4dA0KhIMGNBvP1C-HEAAq1-AAJnXTBLajfkIZ89vVo7BA",
  "80": "BAACAgQAAxkBAAMEahADZTa5KCuuDdDmqgacLVv5DEoAAlMYAAKw80hTMhqFtssE4G87BA",
  "81": "BAACAgQAAxkBAAMXahAEHowiMZ1pa6nItlfQClSE_uUAAoUbAAIuCpFT9zbn9W5eGfI7BA",
  "82": "BAACAgQAAxkBAAMYahAEHuAdLdB_raKSuhTtOdoaQ5cAArIbAAIuCpFTY21gyaOZZS87BA",
  "115": "BAACAgIAAxkBAAMZahAEHvg7hOmm-080wbXZnqsR2ocAAo-FAAL6XnhKnHPZJ-EIW0c7BA",
  "159": "BAACAgQAAxkBAAMaahAEHnbTLOuy6HT6_v9gVW8ByMIAAuwiAAIr6hBQkzOHwI1JYX07BA",
  "160": "BAACAgQAAxkBAAMbahAEHoRFxeDzgSFESliKM5av-8IAAuoiAAIr6hBQS3ujIORgRB87BA",
  "161": "BAACAgIAAxkBAAMcahAEHvpEcAmWZC7O_z0Oq9R6fLsAAvV8AAKVNnlKiQ7OwjR-Mus7BA"
};

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const postId = event.queryStringParameters?.post;
  if (!postId || !FILE_IDS[postId]) {
    return { statusCode: 404, headers, body: JSON.stringify({ error: 'Episode not found' }) };
  }

  const TOKEN = '8736247731:AAGkeMO_0uZHxUcEBMeWevdUw4PMUfJ0gJ8';
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TOKEN}/getFile?file_id=${FILE_IDS[postId]}`
    );
    const data = await res.json();

    if (!data.ok || !data.result?.file_path) {
      return { statusCode: 502, headers, body: JSON.stringify({ error: data.description || 'Telegram error' }) };
    }

    const videoUrl = `https://api.telegram.org/file/bot${TOKEN}/${data.result.file_path}`;
    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: videoUrl })
    };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
