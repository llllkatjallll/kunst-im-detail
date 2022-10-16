// NEEDLE_CODEGEN_START
// auto generated code - do not edit directly

#pragma warning disable

namespace Needle.Typescript.GeneratedComponents
{
	public partial class SpatialTriggerReceiver : UnityEngine.MonoBehaviour
	{
		public float @objectId = 1f;
		public float @triggerMask = 0f;
		public UnityEngine.Events.UnityEvent @onEnter;
		public UnityEngine.Events.UnityEvent @onStay;
		public UnityEngine.Events.UnityEvent @onExit;
		public void start(){}
		public void update(){}
		public Needle.Engine.Components.SpatialTrigger[] @currentIntersected = new Needle.Engine.Components.SpatialTrigger[]{ };
		public Needle.Engine.Components.SpatialTrigger[] @lastIntersected = new Needle.Engine.Components.SpatialTrigger[]{ };
		public void onEnterTrigger(Needle.Engine.Components.SpatialTrigger @trigger){}
		public void onExitTrigger(Needle.Engine.Components.SpatialTrigger @trigger){}
		public void onStayTrigger(Needle.Engine.Components.SpatialTrigger @trigger){}
	}
}

// NEEDLE_CODEGEN_END