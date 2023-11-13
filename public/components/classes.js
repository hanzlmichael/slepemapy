export class Test {
  constructor(testTitle, maps, questions, isActive, marksRange, completeUntil) {
    this.testTitle = testTitle;
    this.maps = maps;
    this.questions = questions;
    this.isActive = isActive;
    this.marksRange = marksRange;
    this.completeUntil = completeUntil;
  }
}

export class Question {
  constructor(answers, points, map, shapes) {
    this.answers = answers;
    this.points = points;
    this.map = map;
    this.shapes = shapes;
  }
}

export class Answer {
  constructor(term, isCorrect) {
    this.term = term;
    this.isCorrect = isCorrect;
  }
}

export class Map {
  constructor(mapId, title, data) {
    this.mapId = mapId;
    this.title = title;
    this.data = data;
  }
}