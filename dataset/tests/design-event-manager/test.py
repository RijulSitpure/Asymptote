import unittest
from solution import EventManager

class TestSolution(unittest.TestCase):
    def test_basic(self):
        em = EventManager()
        em.subscribe("click", 1)
        em.subscribe("click", 2)
        self.assertEqual(em.emit("click"), [1, 2])
        em.unsubscribe("click", 1)
        self.assertEqual(em.emit("click"), [2])

if __name__ == '__main__':
    unittest.main()
