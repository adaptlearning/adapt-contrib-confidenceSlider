/*
* adapt-personal-bookmarking
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
*/

define([
    'coreJS/adapt'
], function (Adapt) {

    var serializer = {
        serialize: function () {
            return this.serializeSaveState();
        },

        serializeSaveState: function() {
            if (Adapt.course.get('_latestTrackingId') === undefined) {
                var message = "This course is missing a latestTrackingID.\n\nPlease run the grunt process prior to deploying this module on LMS.\n\nScorm tracking will not work correctly until this is done.";
                console.error(message);
                return "";
            }

            var rtn = "";
            try {
                var data = this.captureData();
                if (data.length === 0) return "";
                rtn = data;
            } catch(e) {
                console.error(e);
            }

            return rtn;
        },

        captureData: function() {
            var confidenceSliders = Adapt.components.where({'_component':'confidenceSlider', '_shouldStoreResponses':true});
            var data = [];
            
            _.each(confidenceSliders, function(model) {
                data.push({'_id':model.get('_id'), '_userAnswer':model.get('_userAnswer')});
            });
            
            return data;
        },

        deserialize: function (obj) {
            try {
                this.releaseData(obj);
            } catch(e) {
                console.error(e);
            }
        },    

        releaseData: function (obj) {
            _.each(obj, function(item) {
                
                var model = Adapt.findById(item._id);

                model.set({'_userAnswer':item._userAnswer});

                if (model.has('_userAnswer')) model.set({'_isSubmitted':true, '_isInteractionComplete':true});
            });
        }
    };

    return serializer;
});