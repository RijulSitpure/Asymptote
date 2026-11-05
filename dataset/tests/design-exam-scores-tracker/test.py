import heapq

class ExamScoresTracker:
    def __init__(self):
        self.scores = []

    def addScore(self, student_id: int, score: int) -> None:
        self.scores.append(score)

    def getTopKAverage(self, k: int) -> float:
        top_k = heapq.nlargest(k, self.scores)
        return sum(top_k) / k

def run_tests():
    tracker = ExamScoresTracker()
    tracker.addScore(1, 90)
    tracker.addScore(2, 80)
    tracker.addScore(3, 100)
    assert abs(tracker.getTopKAverage(2) - 95.0) < 1e-5
    tracker.addScore(4, 70)
    assert abs(tracker.getTopKAverage(3) - 90.0) < 1e-5
    print("All tests passed for 3709.")

if __name__ == "__main__":
    run_tests()