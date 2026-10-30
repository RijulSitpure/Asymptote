class Solution:
    def numberOfBeams(self, bank: list[str]) -> int:
        total_beams = 0
        prev_devices = 0

        for row in bank:
            count = row.count('1')
            if count > 0:
                total_beams += prev_devices * count
                prev_devices = count

        return total_beams
