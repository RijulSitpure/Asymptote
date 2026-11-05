def countCommasInRange(low: int, high: int) -> int:
    def count_up_to(n: int) -> int:
        commas = 0
        threshold = 1000
        while n >= threshold:
            commas += (n - threshold + 1)
            threshold *= 1000
        return commas

    return count_up_to(high) - count_up_to(low - 1)