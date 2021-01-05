import React from 'react';

function Card({index, data: {id}, width}) {
  return (
    <div className="card">
      <h4 className="card__title">Выращиваем желе</h4>
      <img className="card__img" src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg" />
      <div className="card__content">
        <p className="text-truncate text-slice">Чтобы вырастить общительное дружелюбное желе,
        нам потребуется рулон поролона, два килограмма сахара,
    три яйца и пол чайной чашки ацетона.</p>

        <a className="card__link" href="#">Не читать дальше...</a>
      </div>
    </div>
  )
}

export default React.memo(Card);