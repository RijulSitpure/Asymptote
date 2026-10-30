class Solution:
    def topStudents(self, positive_feedback: list[str], negative_feedback: list[str], report: list[str], student_id: list[int], k: int) -> list[int]:
        pos_set = set(positive_feedback)
        neg_set = set(negative_feedback)
        scored = []
        for rep, sid in zip(report, student_id):
            score = 0
            for word in rep.split():
                if word in pos_set:
                    score += 3
                elif word in neg_set:
                    score -= 1
            scored.append((-score, sid))
        scored.sort()
        return [sid for _, sid in scored[:k]]
