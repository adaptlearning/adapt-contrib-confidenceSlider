define([
    'core/js/adapt',
    './confidenceSliderView',
    './confidenceSliderModel'
], function(Adapt, ConfidenceSliderView, ConfidenceSliderModel) {

    Adapt.on('app:dataReady', function() {
        // is tracking enabled?
        if (Adapt.config.has('_spoor') && Adapt.config.get('_spoor')._isEnabled) {
            // if spoor is handling response tracking we don't need to do anything
            if (!Adapt.config.get('_spoor')._tracking._shouldStoreResponses) {
                // ensure data is setup
                Adapt.offlineStorage.get();

                _.each(Adapt.components.where({'_component':'confidenceSlider', '_shouldStoreResponses':true}), function(confidenceSlider) {
                    var dataItem = Adapt.offlineStorage.get(confidenceSlider.get('_id'));

                    if (!dataItem) return;

                    var numericParameters = dataItem[0];
                    var booleanParameters = dataItem[1];

                    var score = numericParameters[0];
                    var attemptsLeft = numericParameters[1] || 0;

                    var hasUserAnswer = booleanParameters[0];
                    var isUserAnswerArray = booleanParameters[1];
                    var isInteractionComplete = booleanParameters[2];
                    var isSubmitted = booleanParameters[3];
                    var isCorrect = booleanParameters[4];

                    confidenceSlider.set("_isComplete", true);
                    confidenceSlider.set("_isInteractionComplete", isInteractionComplete);
                    confidenceSlider.set("_isSubmitted", isSubmitted);
                    confidenceSlider.set("_score", score);
                    confidenceSlider.set("_isCorrect", isCorrect);
                    confidenceSlider.set("_attemptsLeft", attemptsLeft);

                    if (hasUserAnswer) {
                        var userAnswer = dataItem[2];
                        if (!isUserAnswerArray) userAnswer = userAnswer[0];

                        confidenceSlider.set("_userAnswer", userAnswer);
                    }
                });
            }
        }
    });

    return Adapt.register("confidenceSlider", {
        view: ConfidenceSliderView,
        model: ConfidenceSliderModel
    });
});
