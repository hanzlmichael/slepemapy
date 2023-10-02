class Test {
  constructor(testTitle, questions, maps, isActive, marksRange, completeUntil) {
    this.testTitle = testTitle;
    this.questions = questions;
    this.maps = maps;
    this.isActive = isActive;
    this.marksRange = marksRange;
    this.completeUntil = completeUntil;
  }
}

class Question {
  constructor(answers, points, map) {
    this.answers = answers;
    this.points = points;
    this.map = map;
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
  constructor(data) {
    this.data = data;
  }
}