import './images.html';
import { Images } from '/imports/api/images/images.js';
Template.images.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  console.log(123, Images.findOne())
  window.a = Images
  Meteor.subscribe('images.all');
});

Template.images.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  imageFile() {
    console.log(123, Images.findOne())
    return Images.findOne();
  },
});

Template.images.events({
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});