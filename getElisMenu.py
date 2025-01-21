#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests
import json
from flask import Flask, Response

app = Flask(__name__)
PAGE_URL = "https://aiuto.elis.org/menu/"

def ottieniJSON():
    page = requests.get(PAGE_URL)
    soup = BeautifulSoup(page.content, 'html.parser')
    sezioni = soup.select(".row.mr-1.ml-2.mt-1.mb-1")[0].find_all(recursive=False)
    allSezJ = []

    for i, sezione in enumerate(sezioni):
        sezJ = {}
        sezJ["title"] = sezione.select(".pietanze")[0].text.strip()
        sezione = sezione.select(".col-12.text-left")[0].find_all(recursive=False)
        itemsJ = []
        for j in range(0, len(sezione), 2):
            itemJ = {}

            images = sezione[j].find_all('img')
            image_sources = [img['src'] for img in images]
            itemJ["glutenFree"] = ("/Menu/img/gluten.png" in image_sources)
            itemJ["lactoseFree"] = ("/Menu/img/lactose.png" in image_sources)

            itemJ["name"] = sezione[j].text.replace("-", "").strip()

            ingredientiRaw = sezione[j + 1].decode_contents() if j + 1 < len(sezione) else None
            ingredientiRaw = ingredientiRaw.replace("\xa0", " ")

            ingredienti_soup = BeautifulSoup(ingredientiRaw, 'html.parser')
            strong_tags = ingredienti_soup.find_all('strong')
            strong_texts = [tag.text.replace(",", "") for tag in strong_tags]
            for tag in strong_tags:
                tag.extract() # leva da array originale
            itemJ["ingredientiAllergeni"] = strong_texts

            ingredientiRaw = ingredienti_soup.text
            ingredientiRaw = ingredientiRaw.replace("(", "")
            ingredientiRaw = ingredientiRaw.replace(")", "")
            ingredientiRaw = ingredientiRaw.replace("\n", "")
            ingredientiRaw = ingredientiRaw.replace("\r", "").strip()

            itemJ["ingredienti"] = ingredientiRaw.split(", ")
            itemsJ.append(itemJ)

        sezJ["items"] = itemsJ
        allSezJ.append(sezJ)

    return json.dumps(allSezJ)

@app.route('/getElisMenu/json')
def home():
    response = Response(ottieniJSON())
    response.headers["Content-Type"] = "application/json"
    return response

if __name__ == '__main__':
    app.run(debug=False, port=8817)
