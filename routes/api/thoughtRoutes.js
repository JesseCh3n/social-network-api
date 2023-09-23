const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:ThoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/Thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/Thoughts/:thoughtId/reactions/:ReactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
