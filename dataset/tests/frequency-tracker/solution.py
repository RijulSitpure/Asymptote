class FrequencyTracker:
    def __init__(self):
        from collections import defaultdict
        self.num_freq = defaultdict(int)
        self.freq_count = defaultdict(int)

    def add(self, number: int) -> None:
        old_f = self.num_freq[number]
        if old_f > 0:
            self.freq_count[old_f] -= 1
        new_f = old_f + 1
        self.num_freq[number] = new_f
        self.freq_count[new_f] += 1

    def deleteOne(self, number: int) -> None:
        old_f = self.num_freq[number]
        if old_f == 0:
            return
        self.freq_count[old_f] -= 1
        new_f = old_f - 1
        self.num_freq[number] = new_f
        if new_f > 0:
            self.freq_count[new_f] += 1

    def hasFrequency(self, frequency: int) -> bool:
        return self.freq_count[frequency] > 0
