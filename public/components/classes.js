class Test {
  constructor(testTitle, maps, questions, isActive, marksRange, completeUntil) {
    this.testTitle = testTitle;
    this.maps = maps;
    this.questions = questions;
    this.isActive = isActive;
    this.marksRange = marksRange;
    this.completeUntil = completeUntil;
  }
}

class Question {
  constructor(answers, points, map, shapes) {
    this.answers = answers;
    this.points = points;
    this.map = map;
    this.shapes = shapes;
  }
}

class Answer {
  constructor(term, isCorrect) {
    this.term = term;
    this.isCorrect = isCorrect;
  }

  // Metoda pro nastavení hodnoty term
  setTerm(term) {
    this.term = term;
  }

  // Metoda pro nastavení hodnoty isCorrect
  setIsCorrect(isCorrect) {
    this.isCorrect = isCorrect;
  }

  // Metoda pro získání hodnoty term
  getTerm() {
    return this.term;
  }

  // Metoda pro získání hodnoty isCorrect
  getIsCorrect() {
    return this.isCorrect;
  }
}

class Map {
  constructor(mapId, title, data) {
    this.mapId = mapId;
    this.title = title;
    this.data = data;
  }
}