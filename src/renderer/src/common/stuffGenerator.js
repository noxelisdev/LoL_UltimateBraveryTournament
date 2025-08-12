async function generatePlayerRunes() {
  const runesData = await window.league.getData('runes')

  const mainRuneTree =
    runesData.main[
      Object.keys(runesData.main)[Math.floor(Math.random() * Object.keys(runesData.main).length)]
    ]
  const mainRune1 =
    mainRuneTree.slots[0].runes[Math.floor(Math.random() * mainRuneTree.slots[0].runes.length)]
  const mainRune2 =
    mainRuneTree.slots[1].runes[Math.floor(Math.random() * mainRuneTree.slots[1].runes.length)]
  const mainRune3 =
    mainRuneTree.slots[2].runes[Math.floor(Math.random() * mainRuneTree.slots[2].runes.length)]
  const mainRune4 =
    mainRuneTree.slots[3].runes[Math.floor(Math.random() * mainRuneTree.slots[3].runes.length)]

  let secondaryRuneTree =
    runesData.main[
      Object.keys(runesData.main)[Math.floor(Math.random() * Object.keys(runesData.main).length)]
    ]
  while (secondaryRuneTree.key === mainRuneTree.key) {
    secondaryRuneTree =
      runesData.main[
        Object.keys(runesData.main)[Math.floor(Math.random() * Object.keys(runesData.main).length)]
      ]
  }

  const secondaryRune1Slot = Math.floor(Math.random() * secondaryRuneTree.slots.length)
  let secondaryRune2Slot = Math.floor(Math.random() * secondaryRuneTree.slots.length)
  while (secondaryRune2Slot === secondaryRune1Slot) {
    secondaryRune2Slot = Math.floor(Math.random() * secondaryRuneTree.slots.length)
  }
  const secondaryRune1 =
    secondaryRuneTree.slots[secondaryRune1Slot].runes[
      Math.floor(Math.random() * secondaryRuneTree.slots[secondaryRune1Slot].runes.length)
    ]
  const secondaryRune2 =
    secondaryRuneTree.slots[secondaryRune2Slot].runes[
      Math.floor(Math.random() * secondaryRuneTree.slots[secondaryRune2Slot].runes.length)
    ]

  const statRune1 = runesData.stats[0][Math.floor(Math.random() * runesData.stats[0].length)]
  const statRune2 = runesData.stats[0][Math.floor(Math.random() * runesData.stats[0].length)]
  const statRune3 = runesData.stats[0][Math.floor(Math.random() * runesData.stats[0].length)]

  return [
    mainRune1,
    mainRune2,
    mainRune3,
    mainRune4,
    secondaryRune1,
    secondaryRune2,
    statRune1,
    statRune2,
    statRune3
  ]
}

async function generatePlayerItems(championId, lane) {
  const itemsData = await window.league.getData('items')
  let maximumLegendaryItems = 5
  let selectedItems = []
  let legendaryItems = []

  if (lane === 'jungle' || lane === 'support') {
    selectedItems.push({
      type: lane,
      data: itemsData[lane][Math.floor(Math.random() * itemsData[lane].length)]
    })
  }

  if (championId !== 'Cassiopeia') {
    selectedItems.push({
      type: 'boots',
      data: itemsData.boots[Math.floor(Math.random() * itemsData.boots.length)]
    })
  } else {
    maximumLegendaryItems++
  }

  while (legendaryItems.length < maximumLegendaryItems) {
    const legendaryItem =
      itemsData.legendary[Math.floor(Math.random() * itemsData.legendary.length)]

    if (legendaryItems.indexOf(legendaryItem.name) === -1) {
      legendaryItems.push(legendaryItem.name)
      selectedItems.push({
        type: 'legendary',
        data: legendaryItem
      })
    }
  }

  return selectedItems
}

async function generatePlayerItem(type) {
  const itemsData = await window.league.getData('items')
  return itemsData[type][Math.floor(Math.random() * itemsData[type].length)]
}

async function generatePlayerSummoners(lane) {
  const summonersData = await window.league.getData('summoners')
  let summoners = []
  let summonersIds = []

  if (lane === 'jungle') {
    summoners.push(summonersData.find((summoner) => summoner.id === 'SummonerSmite'))
    summonersIds.push('SummonerSmite')
  }

  while (summoners.length < 2) {
    const selectedSummoner = summonersData[Math.floor(Math.random() * summonersData.length)]

    if (
      selectedSummoner.id !== 'SummonerSmite' &&
      summonersIds.indexOf(selectedSummoner.id) === -1
    ) {
      summoners.push(selectedSummoner)
      summonersIds.push(selectedSummoner.id)
    }
  }

  return summoners
}

async function generatePlayerMainSpell(championId) {
  const championData = (await window.league.getData('champions'))[championId]
  const selectedSpellNumber = Math.floor(Math.random() * 3) // R excluded from possible spells
  let selectedSpell = championData.spells[selectedSpellNumber]

  switch (selectedSpellNumber) {
    default:
      selectedSpell.spellKey = 'A'
      break
    case 1:
      selectedSpell.spellKey = 'Z'
      break
    case 2:
      selectedSpell.spellKey = 'E'
      break
    case 3:
      selectedSpell.spellKey = 'R'
      break
  }

  return selectedSpell
}

export {
  generatePlayerRunes,
  generatePlayerItems,
  generatePlayerItem,
  generatePlayerSummoners,
  generatePlayerMainSpell
}
