class Solution:
    def discountPrices(self, sentence: str, discount: int) -> str:
        words = sentence.split(" ")
        multiplier = 1.0 - discount / 100.0
        res = []
        for w in words:
            if len(w) > 1 and w[0] == "$" and w[1:].isdigit():
                val = int(w[1:]) * multiplier
                res.append(f"${val:.2f}")
            else:
                res.append(w)
        return " ".join(res)
