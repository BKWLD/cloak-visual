import CloakVisual from '@cloak-app/visual/components/visual'
export default {
  functional: true,

  // Support all the main Cloak Visual props
  props: {
    ...CloakVisual.props,

    // Support Sanity asset objects
    image: Object,
    video: Object,

    // Clear props with defaults
    objectPosition: {
      type: String,
      default: undefined,
    }
  },

  // Make a CloakVisual instance from Sanity asset instances
  render(create, { props, data }) {
    return create(CloakVisual, {
      ...data,
      props: {
        ...props,

        // Pass along props that were extrapolated from Sanity objects
        image: getAssetRef(props.image),
        video: getVideoUrl(props.video),
        aspect: props.aspect ||
          props.image?.asset?.metadata?.dimensions?.aspectRatio,
        alt: props.alt || props.image?.alt || "",
        objectPosition: props.objectPosition || makeObjectPosition(props.image),

        // Apply cropping
        modifiers: {
          crop: props.image?.crop,
          hotspot: props.image?.hotspot,
        }
      }
    })
  }
}

// @nuxt/image is expecting a simple ref value for the image. Check the `_id`,
// where the ref will be when the field is de-referenced, or on `_ref`, when it
// isn't.
function getAssetRef(source) {
  return source?.asset?._id || source?.asset?._ref
}

// Get the video URL assuming it's been derefernced.  I didn't build support
// for ref support here but it should be technically possible
function getVideoUrl(source) {
  const dereferencedUrl = source?.asset?.url
  if (dereferencedUrl) return dereferencedUrl
}

// Make object-position values from the hotspot data
export function makeObjectPosition(source) {
  if (!source?.hotspot) return
  const left = source.hotspot.x - source.crop.left + source.crop.right,
    top =  source.hotspot.y - source.crop.top + source.crop.bottom
  return `${left * 100}% ${(top) * 100}%`
}
